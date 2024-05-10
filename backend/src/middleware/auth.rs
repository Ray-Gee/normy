use crate::auth::jwt::validate_jwt;
use actix_service::Service;
use actix_web::body::{BoxBody, MessageBody};
use actix_web::{
    dev::{ServiceRequest, ServiceResponse, Transform},
    Error, HttpMessage, HttpResponse,
};
use futures::future::{ok, LocalBoxFuture, Ready};
use std::rc::Rc;
use std::task::{Context, Poll};

pub struct Auth;

impl<S> Transform<S, ServiceRequest> for Auth
where
    S: Service<ServiceRequest, Response = ServiceResponse<BoxBody>, Error = Error> + 'static,
    S::Future: 'static,
{
    type Response = ServiceResponse<BoxBody>;
    type Error = Error;
    type Transform = AuthMiddleware<S>;
    type InitError = ();
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ok(AuthMiddleware {
            service: Rc::new(service),
        })
    }
}

pub struct AuthMiddleware<S> {
    service: Rc<S>,
}

impl<S> Service<ServiceRequest> for AuthMiddleware<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<BoxBody>, Error = Error> + 'static,
    S::Future: 'static,
{
    type Response = ServiceResponse<BoxBody>;
    type Error = Error;
    type Future = LocalBoxFuture<'static, Result<Self::Response, Self::Error>>;

    fn poll_ready(&self, cx: &mut Context<'_>) -> Poll<Result<(), Self::Error>> {
        self.service.poll_ready(cx)
    }

    fn call(&self, req: ServiceRequest) -> Self::Future {
        let srv = self.service.clone();

        Box::pin(async move {
            if let Some(authen_header) = req.headers().get("Authorization") {
                if let Ok(authen_str) = authen_header.to_str() {
                    if authen_str.starts_with("Bearer ") {
                        let token = &authen_str[7..];
                        if validate_jwt(token).is_ok() {
                            return srv.call(req).await;
                        }
                    }
                }
            }
            let response = HttpResponse::Found()
                .append_header(("Location", "/login"))
                .finish()
                .map_into_boxed_body();
            let (req_parts, _body) = req.into_parts();
            let service_response = ServiceResponse::new(req_parts, response);
            Ok(service_response)
        })
    }
}
