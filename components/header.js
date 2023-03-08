class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <style>
            nav{
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                padding: 15px 8%; /*20px 8%;*/
                background-color: rgba(211, 211, 211, 0.20);    
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            nav .logo{
                width: 60px;
            }
            nav ul li{
                list-style: none;
                display: inline-block;
                margin-left: 50px;
            }
            nav ul li a{
                text-decoration: none;
                color: #8B008B;
                font-size: 25px;
            }
        </style>
        <nav>
            <img src="./ressources/lean.png" class="logo">
            <ul>
                <li><a href="index.html">HOME</a></li>
                <li><a href="contact.html">INFO</a></li>
            </ul>
        </nav>
      `;
    }
  }
  
  customElements.define('header-component', Header);