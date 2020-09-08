window.onload = function () {
    // view.showScreen('login');
    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            // load score, status từ users
            let response = await firebase.firestore().collection('users').doc(user.email).get();
            let detail = response.data();

            model.currentUser = {
                displayName: user.displayName,
                email: user.email,
                score: detail.score,
                status: detail.status
            }

            controller.listenRequestChallengeUpdate();
            view.showScreen('lobby')

        } else {
            model.currentUser = null;
            view.showScreen('login')
        }
    });
}

// window.onbeforeunload = function () {
//     let confirmExit = window.confirm('Bạn có muốn rời khỏi cuộc đấu?');

//     if(confirmExit) {
//         // let winner = null;
//         // if(model.currentUser.email == challenge.from) {
//         //     winner = 1;
//         // } else if(model.currentUser.email == challenge.to) {
//         //     winner = 0;
//         // }
//         // controller.endFight(winner);
//     }
// }

// function exitScreen() {
//     let confirmExit = window.confirm('Bạn có muốn rời khỏi cuộc đấu?');
// }