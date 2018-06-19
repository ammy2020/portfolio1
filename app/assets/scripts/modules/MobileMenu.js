import $ from  'jquery';

class MobileMenu {

    constructor(){
        $(".site-header__menu-icon").click(function () {
            console.log("the top right icon was clicked");
        });
    }
}

export default MobileMenu;