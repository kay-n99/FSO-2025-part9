interface Values {
    height: number;
    weight: number;
}

const parseArgs = (args: string[]): Values => {
    if(args.length < 4) throw new Error('Not enough arguments');
    if(args.length > 4) throw new Error('Too many arguments');
    
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return{
            height: Number(args[2]),
            weight: Number(args[3])
        }
    }else{
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBmi = (height: number, weight: number) => {
    
    const heightCM = height / 100
    const bmi = weight / (heightCM * heightCM);
    let category: string;
    if(bmi < 16){
        category = "Underweight(Severe Thinness)";
    }else if(bmi >= 16 && bmi < 17){
        category = "Underweight(Moderate Thinness)";
    }else if(bmi >= 17 && bmi < 18.5){
        category = "Underweight(Mild Thinness)";
    }else if(bmi >= 18.5 && bmi < 25){
        category = "Normal Range";
    }else if(bmi >= 25 && bmi < 30){
        category = "Overweight(Pre-Obese)";
    }else if(bmi >= 30 && bmi < 35){
        category = "Obese (Class I)";
    }else if(bmi >= 35 && bmi < 40){
        category = "Obese (Class II)";
    }else {
        category = "Obese (Class III)";
    }
    
    console.log(category);
}

try{
    const { height, weight } = parseArgs(process.argv);
    calculateBmi(height, weight);
}catch(error: unknown){
    let errorMessage = 'Something bad happened'
    if(error instanceof Error){
        errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage)
}