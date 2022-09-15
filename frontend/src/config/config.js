let default_url = "http://localhost:8000/api/";
let server_urls = {
  dev: default_url,
  aws_dev: "https://some.random.server/api/"
};

let server_base_url = server_urls[process.env.REACT_APP_ENV] || default_url

let config = {
  SERVER_BASE_URL: server_base_url,
  HOME_UI_BASE_URL: "/",
  ENV_TYPE: "TEST",
};

export default config;