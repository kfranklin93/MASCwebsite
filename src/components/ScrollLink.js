// In your ScrollLink component within Navbar.js:

const ScrollLink = ({ to, children, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation and then scroll
      setTimeout(() => {
        const element = document.querySelector(to);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100, // Adjust for navbar height
            behavior: 'instant' // Changed from 'smooth' to prevent delayed scrolling
          });
        }
      }, 100);
    } else {
      // If already on home page, scroll directly
      const element = document.querySelector(to);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100, // Adjust for navbar height
          behavior: 'instant'
        });
      }
    }
  };

  return (
    <NavLink {...props} to={to} onClick={handleClick}>
      {children}
    </NavLink>
  );
};