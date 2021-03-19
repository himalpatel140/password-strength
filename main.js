var PasswordHandler = {
    numberList: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    aplhaList: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],

    checks: {

        length: function(password) {
            if (password.length >= 8) {
                console.log(password.length);
                return true;
            }
            return false;
        },

        atleastOneAlpha: function(password) {
            let count = 0;
            password.split('').filter(function(each) {
                PasswordHandler.aplhaList.filter(function(element) {
                    if (each == element || each == element.toUpperCase()) {

                        count++;
                    }
                })
            });

            return count;
        },
        atleastOneCapitalAlpha: function(password) {
            let count = 0;
            password.split('').filter(function(each) {
                PasswordHandler.aplhaList.filter(function(element) {
                    if (each == element.toUpperCase()) {

                        count++;
                    }
                })
            });

            return count;
        },

        //password = "we123"
        atleastOneNumber: function(password) {
            let total_number = 0;

            password.split('').forEach(function(each) {
                PasswordHandler.numberList.forEach(function(elm) {
                    if (each == elm) {
                        total_number++;
                        return true;
                    }
                });
            })

            return total_number;

        },
        //password = 'paj32@'
        hasSpecialChar: function(password) {
            let count = 0;
            password.split('').forEach(function(each) {
                if (PasswordHandler.isSpecialChar(each)) {
                    count++;
                }
            });
            return count;
        },
    },

    isNumber: function(a) {
        return PasswordHandler.numberList.includes(a);
    },
    isAlpha: function(a) {
        return PasswordHandler.aplhaList.includes(a.toLowerCase());

    },
    isSpecialChar: function(a) {
        if ((!PasswordHandler.isNumber(a) && !PasswordHandler.isAlpha(a))) {
            return true;
        }
        return false;

    },

    isValid: function(password) {
        let collect = "";
        let test_obj = Object.keys(PasswordHandler.checks);
        //["funtiona1","fun2"]
        test_obj.forEach(function(each) {
            let result = PasswordHandler.checks[each](password);
            collect += (each + " : " + result + "\n");
        });
        $('#results').val(collect);

    }

}

$(document).ready(function() {

    $('#password').keyup(function() {
        let inputVal = $('#password').val();
        if (inputVal.length < 8) {
            $(this).css("background-color", "red");
        } else {
            $(this).css("background-color", "green");
        }
        PasswordHandler.isValid(inputVal);
    });
    $('#generate_password').click(function() {
        let randomPass = randomPassword();
        $('#password').val(randomPass).css('background-color', 'green');
        PasswordHandler.isValid(randomPass);

    });

})


function getRandomSpecialChar() {
    let specialChar = "!@#$%^&*()_+";
    return specialChar.split("")[parseInt(Math.random() * specialChar.length)]

}

function randomPassword() {
    let password = Math.random().toString(36).substring(3, 10) + getRandomSpecialChar() + parseInt(Math.random() * 9) + getRandomUpperCaseChar(1);
    return shuffle(password.split("")).join("")
}

function getRandomUpperCaseChar(count = 1) {
    let allCapitalAlplha = '';
    for (let i = 0; i < count; i++) {
        allCapitalAlplha += PasswordHandler.aplhaList[parseInt(Math.random() * 25)].toUpperCase();
    }
    return allCapitalAlplha;
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}