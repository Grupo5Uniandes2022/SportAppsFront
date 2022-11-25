FROM nginx:1.15

# Docs
LABEL autor="Sport Apps Team"
LABEL vendor="Uniandes"

#Copy ci-dashboard-dist
COPY ./dist/frontend /usr/share/nginx/html
#Copy default nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
