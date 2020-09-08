const model = {};

model.currentUser = null;

model.listUsers = [];

model.challenges = [];
 
model.currentChallenge = null;

model.register = (data) => {
    firebase.auth().createUserWithEmailAndPassword(data.email , data.password).then((res) =>{
        firebase.auth().currentUser.updateProfile({
            displayName: data.firstName + ' ' + data.lastName
        })
        firebase.auth().currentUser.sendEmailVerification()
        alert('The email has been registered, please check you email')
        // thêm doc vào collection users
        firebase.firestore().collection('users').doc(data.email).set({
            displayName: data.firstName + ' ' + data.lastName,
            score: 0,
            status: 'free'
        });
        view.setActiveScreen('loginScreen')
    }).catch((err) => {
        console.log(err)
    })
}

model.login = async (dataLogin) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(dataLogin.email, dataLogin.password)
    } catch (err) {
        console.log(err)
        alert(err.message)
    }
}
