const useMenu = () => {
  const toggleLeftNav = () => {
    if (document.getElementById("leftNav")?.classList.contains("on") == true) {
      closeLeftNav();
    } else {
      openLeftNav();
    }
  };

  const closeLeftNav = () => {
    if (document.getElementById("leftNav")?.classList.contains("on") == true) {
      document.getElementById("leftNav")?.classList.remove("on");
    }
  };

  const openLeftNav = () => {
    document.getElementById("leftNav")?.classList.add("on");
  };

  return {
    toggleLeftNav,
    closeLeftNav,
    openLeftNav,
  };
};

export default useMenu;
