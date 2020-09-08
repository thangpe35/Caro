const view = {};

view.showScreen = function (name) {
    controller.unsubscribeAll();

    switch (name) {
        // login 
        case `login`:
            document.getElementById('app').innerHTML = component.login
            const loginScreen = document.getElementById('login-form')
            loginScreen.addEventListener('submit', (event) => {
                event.preventDefault()
                const dataLogin = {
                    email: loginScreen.email.value,
                    password: loginScreen.password.value
                }
                // user input space
                const reg = /\S/g;
                if (dataLogin.email == '' || !reg.test(dataLogin.email)) {
                    loginScreen.email.value = '';
                }
                console.log(dataLogin)
                controller.login(dataLogin)
            })
            // chuyen huong sang man hinh register
            const Account = document.getElementById('redirect-to-Regiser')
            Account.addEventListener('click', (e) => {
                view.showScreen('register')
            })
            break;
        case 'register':
            document.getElementById('app').innerHTML = component.register
            const registerForm = document.getElementById('register-form')
            registerForm.addEventListener('submit', (event) => {
                event.preventDefault() // ko cho trinh duyet load lai , chi dung cho submit
                const data = {
                    // lay du lieu nguoi dung
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value
                }
                const log = /\S/g;
                if (data.firstName == '' || !log.test(data.firstName)) {
                    registerForm.firstName.value = ''
                }
                if (data.lastName == '' || !log.test(data.lastName)) {
                    registerForm.lastName.value = ''
                }
                if (data.email == '' || !log.test(data.email)) {
                    registerForm.email.value = ''
                }
                console.log(data)
                controller.register(data)
            })
            // chuyen huong sang man hinh login
            const alReady = document.getElementById('redirect-to-login')
            alReady.addEventListener('click', (e) => {
                e.preventDefault();
                view.showScreen('login')
            })
            break;
        case 'lobby':
            document.getElementById('app').innerHTML = component.lobby

            // phải gọi giống như chỗ này
            controller.subscribeRealtimeUpdate.push(controller.listenPlayersStatusChanged());
            document.querySelector('#name-user').innerHTML = model.currentUser.displayName
            const backToLogin = document.getElementById('back-to-login')
            backToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                view.showScreen('login')
            })
            const goToChallenge = document.getElementById('go-to-challenge')
            goToChallenge.addEventListener('click', (e) => {
                e.preventDefault();
                view.showScreen('challengeScreen')
            });
            break;

        case 'fight':
            document.getElementById('app').innerHTML = component.fight
            document.querySelector('#name-user').innerHTML = model.currentUser.displayName
            // controller.subscribeRealtimeUpdate.push(controller.listenCurrentChallengeUpdate());
            view.showCurrentChallenge()
            const backLobby = document.getElementById('back-lobby')
            backLobby.addEventListener('click', ()=>{
                view.showScreen('lobby')
            })
            break;

        case 'challengeScreen':
            document.getElementById('app').innerHTML = component.challengeScreen
            document.querySelector('#name-user').innerHTML = model.currentUser.displayName
            controller.subscribeRealtimeUpdate.push(controller.listenRequestChallengeComing());

            const backToLobby = document.getElementById('back-to-lobby')
            backToLobby.addEventListener('click', (e) => {
                view.showScreen('lobby')
            })
            break;
    }
}

view.showUsers = function () {
    let html = "";
    let sequence = 1;
    for (let user of model.listUsers) {
        html += `
        <div class="players">
            <div class="player-sequence">${sequence++}</div>
            <div class="player-display-name">${user.id}</div>
            <div class="player-score">${user.score}</div>
            <div class="player-status">
                ${(user.status == 'free' && user.id != model.currentUser.email) ? `<a href="#" onclick="controller.challengeOther('${user.id}')"><i class="fa fa-paper-plane"></i></a>` : ``}
            </div>
        </div>`;
    }
    document.querySelector('.list-players').innerHTML = html;
}
view.showChallenges = function () {
    // để cho nó đồng bộ, hay là mình show email thôi nhỷ? show email thôi a, show displayName loằng ngoằng lắm, show email thui nhớ :D vâng =)))
    let html = '';
    let sequence = 1;

    if (model.challenges.length == 0) {
        html = "<b>Hiện tại chưa có lời thách đấu nào</b>"
    } else {
        for (let challenge of model.challenges) {
            html += `
            <div class="players">
                <div class="player-sequence">${sequence++}</div>
                <div class="player-display-name">${challenge.from}</div>
                <div class="player-circle">
                    <a href="#" onclick="controller.handleRequestChallenge('${challenge.id}', 'delete')"><i class="fa fa-minus-circle" aria-hidden="true"></i></a>
                </div>
                <div class="player-status">
                    <a href="#" onclick="controller.handleRequestChallenge('${challenge.id}', 'accept')"><i class="fa fa-paper-plane"></i></a>
                </div>
            </div>`
        }
    }

    document.querySelector('.list-players').innerHTML = html;
}
// view.showPlayer = () =>{
//     let html = `
//     <div class = "score-number">
//                 <div class="text">
//                     <h3>Xin chào</h3>
//                 </div>
//                  <div class="text">
//                     ${model.currentUser}
//                 </div>
//             </div>
//             `
//     document.querySelector('.player').innerHTML = html;
// }
view.showCurrentChallenge = function () {
    view.showTable();
}

view.showTable = function () {
    console.log(model.currentChallenge);

    let table = JSON.parse(model.currentChallenge.table); // do table dữ liệu gốc là 1 chuỗi --> phải convert về mảng 2 chiều
    // let table = [
    //     ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ,'#'],
    //     ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ,'#'],
    //     ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ,'#'],
    //     ['#', '#', '#', '#', '#', '1', '0', '0', '0', '1', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ,'#'],
    //     ['#', '#', '#', '#', '#', '1', '0', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ,'#'],
    //     ['#', '#', '#', '#', '#', '#', '#', '1', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ,'#'],
    //     ['#', '#', '#', '#', '#', '#', '#', '#', '0', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ,'#'],
    //     ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ,'#'],
    //     ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ,'#'],
    //     ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ,'#'],
    //     ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ,'#'],
    //     ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ,'#'],
    //     ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ,'#'],
    //     ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ,'#'],
    //     ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ,'#']
    // ]
    document.getElementById('table').innerHTML = "";
    for (let i = 0; i < table.length; i++) { // hàng
        let row = document.createElement('div');
        row.className = "row";
        for (let j = 0; j < table[i].length; j++) { // cột
            let cell = document.createElement('div');
            cell.className = "cell";
            cell.onclick = function () {
                if (this.innerHTML != '') return;
                // view.checkCol(table, i, j)
                // view.checkRow(table, i, j)
                controller.hitOnTable(i, j);
            }
            if (table[i][j] == 0) {
                cell.innerHTML = `<i class="fa fa-circle-thin"></i>`;
            } else if (table[i][j] == 1) {
                cell.innerHTML = `<i class="fa fa-times"></i>`;
            } else {
                cell.innerHTML = ''
            }
            row.appendChild(cell);
        }
        document.getElementById('table').appendChild(row);
    }
    // const mediaQuery = window.matchMedia('(max-width : 768px)')
    // if (mediaQuery.matches) {
    //     for (let i = 0; i < table.length; i++) { // hàng
    //         let row = document.createElement('div');
    //         row.className = "row";
    //         for (let j = 0; j < table[i].length; j++) { // cột
    //             let cell = document.createElement('div');
    //             cell.className = "cell";
    //             cell.onclick = function () {
    //                 if (this.innerHTML != '') return;
    //                 // view.checkCol(table, i, j)
    //                 // view.checkRow(table, i, j)
    //                 controller.hitOnTable(i, j);
    //             }
    //             if (table[i][j] == 0) {
    //                 cell.innerHTML = `<i class="fa fa-circle-thin"></i>`;
    //             } else if (table[i][j] == 1) {
    //                 cell.innerHTML = `<i class="fa fa-times"></i>`;
    //             } else {
    //                 cell.innerHTML = ''
    //             }
    //             row.appendChild(cell);
    //         }
    //         document.getElementById('table').appendChild(row);
    //     }
    // }

}



