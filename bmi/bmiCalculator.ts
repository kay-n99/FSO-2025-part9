

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
    
    return category;
}

console.log(calculateBmi(180, 74))