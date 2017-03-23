//Drop-down menu

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

function dropDownToggle() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function setupLogoutBtn(btn){
  btn.onclick = function(event){
    nc.ajax({
      type: 'POST',
      url: '/logout',
      success: (response) => {
        nc.replaceBodyWithMsg("You have signed out");

        const navBar = document.getElementById('nav-bar');
        navBar.innerHTML = '';
        const ulEle = document.createElement('ul');
        ulEle.classList = "nav nav-pills";
        ulEle.style = "margin-top:15px;";
        const li1 = document.createElement('li');
        const li2 = document.createElement('li');
        li1.role = "presentation";
        li2.role = "presentation";
        const a1 = document.createElement('a');
        const a2 = document.createElement('a');
        a1.href = "/login";
        a1.innerHTML = "Login";
        a2.href = "/register";
        a2.innerHTML = "Register";
        li1.appendChild(a1);
        li2.appendChild(a2);
        ulEle.appendChild(li1);
        ulEle.appendChild(li2);
        navBar.appendChild(ulEle);
      }
    });
  }
}

nc.onload(function(){

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.acc-drop-btn')) {

      var dropdowns = document.getElementsByClassName("dropdown-menu");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


  const logoutBtn = document.getElementById("main-layout-logout");
  if(logoutBtn)
    setupLogoutBtn(logoutBtn);
});
