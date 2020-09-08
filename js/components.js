const component = {};

component.login = `
<div class="login-container">
<div class="aside-right">
    <div class="header">
        <img src="./img/avatar1.png">
    </div>
    <form id="login-form">
        <div class="input-name-wrapper">
                <div class="input-wrapper">
                    <input type="text" placeholder="Email" name="email">
                    <div class="error" id="email-error"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" placeholder="Password" name="password">                         
                    <div class="error" id="password-error"></div>                           
                </div>
                <div class="form-action">
                    <span id="redirect-to-Regiser">
                        Don't have an account? Register
                    </span>
                    <button class="btn" type="submit" id="btn">
                        login
                    </button>
                 </div>
            </div>
    </form>
</div>
</div>`

component.register = `<div class="register-container">
<div class="aside-right">
    <div class="header">
        <h3>Create Account</h3>
    </div>
    <form id="register-form">
        <div class="input-name-wrapper">
            <div class="input-wrapper">
                <input type="text" placeholder="First Name" name="firstName">
                <div class="error" id="first-name-error"></div>
            </div>
            <div class="input-wrapper">
                <input type="text" placeholder="Last Name" name="lastName">
                <div class="error" id="last-name-error"></div>
            </div>
        </div>
        <div class="input-wrapper">
            <input type="text" placeholder="Email" name="email">
            <div class="error" id="email-error"></div>
        </div>
        <div class="input-wrapper">
            <input type="password" placeholder="Password" name="password">
            <div class="error" id="password-error"></div>
        </div>
        <div class="input-wrapper">
            <input type="password" placeholder="Confirm password" name="confirmPassword">
            <div class="error" id="confirmPassword-error"></div>
        </div>
        <div class="form-action">
           <span id="redirect-to-login" >
               Already have an account? Login 
           </span>
           <button class="btn" type="submit" id="button-register">
               Register
           </button>
        </div>
    </form>
</div>
</div>`;
component.lobby = `
<div class="top-container">
<!-- Phần header -->
<div class="header-container">
    <div class="header">
        <h3>
            Caro Online
        </h3>
    </div>
</div>

<!-- Nội dung chính -->
<div class="content-container">
    <!-- Show list user -->
    <div class="list-players">
        <!-- hình dáng của 1 player trông sẽ như này, chứ ko phải chia theo kiểu cột như thế kia, h style cho nó đi -->
        <div class="players">
            
        </div>
        
        <div class="players">
            
        </div>
        <div class="players">
            
        </div>
        <div class="players">
            
        </div>
    </div>

    <!-- Menu chính -->
    <form class="form-player">
        <div class="player">
            <div class = "score-number">
                <div class="text">
                    <h3>Xin chào</h3>
                </div>
                 <div class="text" id="name-user">
                    Thắng
                </div>
            </div>
        </div>
        <div class="player">
            <div class="score-number">
                <div class="text">
                    <h3>Điểm số</h3>
                </div>
                <div class="text" id="score-user">
                    
                </div>
            </div>
        </div>
        <div class="player">
            <div class="score-number">
                <div class="text">
                    <h3 id="go-to-challenge">Lời thách đấu</h3>
                </div>
            </div>
        </div>
        <div class="btn-player">
            <button class="btn"><a href="#" id="back-to-login">Đăng Xuất</a></button>
        </div>
    </form>
</div>
</div>`
component.challengeScreen = `
<div class="top-container">
<!-- Phần header -->
<div class="header-container">
    <div class="header">
        <h3>
            Caro Online
        </h3>
    </div>
</div>

<!-- Nội dung chính -->
<div class="content-container">
    <!-- Show list user -->
    <div class="list-players">
        <!-- hình dáng của 1 player trông sẽ như này, chứ ko phải chia theo kiểu cột như thế kia, h style cho nó đi -->
        <div class="players">
            
        </div>
        <div class="players">
            
        </div>
        <div class="players">
            
        </div>
        <div class="players">
            
        </div>
    </div>
    <!-- Menu chính -->
    <form class="form-player">
        <div class="player">
            <div class = "score-number">
                <div class="text">
                    <h3>Xin chào</h3>
                </div>
                <div class="text" id="name-user">
                    Thắng
                </div>
            </div>
        </div>
        <div class="player">
            <div class="score-number">
                <div class="text">
                    <h3>Điểm số</h3>
                </div>
                <div class="text" id="score-user">
                    2157
                </div>
            </div>
        </div>
        <div class="player">
            <div class="score-number">
                <div class="text">
                    <h3 id="back-to-lobby">Top ngươi chơi</h3>
                </div>
            </div>
        </div>
        <div class="btn-player">
            <button class="btn"><a href="#" id="back-to-login">Đăng Xuất</a></button>
        </div>
    </form>
</div>
</div>
`

component.fight = `  
<div class="chess-container">
<div class="header-container">
    <div class="header">
        <h3>
            Caro Online
        </h3>
    </div>
</div>
<div class="table-chess">
    <div class="table" id="table">

    </div>
    <form class="form-player">
        <div class="player">
            <div class="player">
                <div class="score-number">
                    <div class="text">
                        <h3>Xin chào</h3>
                    </div>
                    <div class="text" id="name-user">
                        Thắng
                    </div>
                </div>
            </div>
        </div>
        <div class="player">
            <div class="score-number">
                <div class="text">
                    <h3>Lượt đánh</h3>
                </div>
                <div class="text">
                    bạn
                </div>
            </div>
        </div>
        <div class="player">
            <div class="score-number">
                <div class="text">
                    <h3>00:00</h3>
                </div>
            </div>
        </div>
        <div class="player">
            <div class="score-number">
                <div class="text">
                    <h3 id="back-lobby">Thoát</h3>
                </div>
            </div>
        </div>
    </form>
</div>
</div>
`;
