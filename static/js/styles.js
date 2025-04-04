document.addEventListener("DOMContentLoaded", function () {
   let num = 0;
   
   document.getElementById("theme-mode").addEventListener("click", function () {
      let themeLink = document.getElementById("theme");
      let lightTheme = this.dataset.light;
      let darkTheme = this.dataset.dark;

      if (num === 0) {
         themeLink.href = lightTheme;
         this.textContent = "light_mode";
         num = 1;
      } else {
         themeLink.href = darkTheme;
         this.textContent = "dark_mode";
         num = 0;
      }
   });
});
