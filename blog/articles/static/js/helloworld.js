var a=1;



var groupmates = [
    {
        "name": "Алексей",
        "surname": "Комаров",
        "group": "БФИ1702",
        "marks": [4, 3, 5]
    },
    {
        "name": "Максим",
        "surname": "Петров",
        "group": "БСТ2202",
        "marks": [5, 3, 4]
    },
    {
        "name": "Кирилл",
        "surname": "Смирнов",
        "group": "БФИ2201",
        "marks": [5, 5, 5]
    }
];


var rpad = function(str, length) {
    // js не поддерживает добавление нужного количества символов
    // справа от строки, т.е. аналога ljust из Python здесь нет 
    str = str.toString(); // преобразование в строку
    while (str.length < length)
        str = str + ' '; // добавление пробела в конец строки return str; // когда все пробелы добавлены, возвратить строку
    return str;
    };

    
var printStudents = function(students){ 
    console.log(
    rpad("Имя", 15),
    rpad("Фамилия", 15),
    rpad("Группа", 8),
    rpad("Оценки", 20)
    );
    // был выведен заголовок таблицы
    for (var i = 0; i<=students.length-1; i++){
    // в цикле выводится каждый экземпляр студента 
        console.log(
        rpad(students[i]['name'], 15),
        rpad(students[i]['surname'], 15),
        rpad(students[i]['group'], 8),
        rpad(students[i]['marks'], 20)
        );
    }
    console.log('\n'); // добавляется пустая строка в конце вывода
    };

printStudents(groupmates); 

var filterByGroup=function(group,students){
    console.log(
        rpad("Имя", 15),
        rpad("Фамилия", 15),
        rpad("Группа", 8),
        rpad("Оценки", 20)
        );
    for (var i=0;i<=students.length-1;i++){
        if(students[i]['group']==group){
            console.log(
            rpad(students[i]['name'], 15),
            rpad(students[i]['surname'], 15),
            rpad(students[i]['group'], 8),
            rpad(students[i]['marks'], 20)
            );
        }
        
    }
    console.log('\n'); 
}

var filterByGrade=function(grade,students){
    console.log(
    rpad("Имя", 15),
    rpad("Фамилия", 15),
    rpad("Группа", 8),
    rpad("Оценки", 20)
    );
    
        for (var i=0;i<=students.length-1;i++){
            var sum=0
            var srsum=0;
            for (var j=0;j<students[i]['marks'].length;j++){
                sum+= students[i]['marks'][j];
            }
            srsum=sum/students[i]['marks'].length
            if(srsum>grade){
                console.log(
                rpad(students[i]['name'], 15),
                rpad(students[i]['surname'], 15),
                rpad(students[i]['group'], 8),
                rpad(students[i]['marks'], 20)
                );
            }
        }
}

const readline = require("readline")
const rl =
readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const question1 = () => {
    return new Promise((resolve, reject) => {
      rl.question('Input group\n', (group) => {
        filterByGroup(group,groupmates)
        resolve()
      })
    })
}
  
const question2 = () => {
    return new Promise((resolve, reject) => {
      rl.question('Input grade\n', (grade) => {
        filterByGrade(grade,groupmates)
        resolve()
      })
    })
}
  
const main = async () => {
    await question1()
    await question2()
    rl.close()
}
  
main()
  