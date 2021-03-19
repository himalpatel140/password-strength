input_1 = ['g', 's', 'm', 'i', "t"];
input = "my name is himal aand thi sis test string to test";

output = {}

function countOccurance(input_1, input) {
    input_1.forEach(function(each) {

        let count = 0;

        input.split('').forEach(function(element) {
            if (each == element) {
                count = count + 1;
                return count;
            }

        })

        console.log(each + " " + count);
        output[each] = count;
    })


}