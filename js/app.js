window.onload = function () {

    

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