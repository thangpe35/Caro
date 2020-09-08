// viết cho a cái hàm getDataFromDoc :D
//  đợi e xem lại cái project kìa =)) e k nhớ =))
getDataFromDocs = (docs) => {


    // dung map 
    return docs.map(item => getDataFromDoc(item));

}
getDataFromDoc = (doc) => {
    const data = doc.data()
    data.id = doc.id
    return data
}

checkFromCurrent = (table, i, j, value) => {
    let countRow = 0;
    let countColumn = 0;
    let countLeftCross = 0;
    let countRightCross = 0;

    for (let count = 0; count < 5; count++) {
        try {
            // check row
            if (table[i][j + count] == value) {
                countRow++
            }

            // check column
            if (table[i + count][j] == value) {
                countColumn++
            }

            // check left cross
            if (table[i + count][j - count] == value) {
                countLeftCross++;
            }

            // check right cross
            if (table[i + count][j + count] == value) {
                countRightCross++;
            }

        } catch (error) {
            // console.log('continue')
        }
    }

    return (
        countRow >= 5 ||
        countColumn >= 5 ||
        countLeftCross >= 5 ||
        countRightCross >= 5
    );
}

checkTable = (table) => {
    let winner = null;
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
            if (checkFromCurrent(table, i, j, 0)) {
                winner = 0;
            } else if (checkFromCurrent(table, i, j, 1)) {
                winner = 1;
            }
        }
        if (winner != null) break;
    }

    return winner;
}