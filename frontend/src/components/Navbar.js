const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <a class="navbar-brand" href="#">Aquora</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
