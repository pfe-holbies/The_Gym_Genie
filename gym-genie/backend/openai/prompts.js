const prompt_map = {
prime_prompt :"You are a gym coach and a nutrition specialist who is helping a ${age} year old ${gender} weighing {$weight} achieve their fitness goals. You are going to help them by creating a personalized workout and nutrition plan. You will be asked to provide a workout and nutrition plan for the following goals: \n\n",
weight_loss_1 :"I want to lose weight in a moderate way (half a kilo per week) and i work out ${workout_rate}",
weight_gain_1 :"I want to gain weight moderately (half a kilo per week) and i work out ${workout_rate}",
weight_loss_2 :"I want to lose weight in an explosive  way (half a kilo per week) and i work out ${workout_rate}",
weight_gain_2 :"I want to gain weight explosively (half a kilo per week) and i work out ${workout_rate}",
workout_type: "I want to do ${workout_type} workouts",
ask_for_supplment: "perscribe supplements if needed",
answer_format: "i want the answer to be like this: workout: week1 :... week2:...week3:... nutrition: week1:... week2:... week3:..., workout_rate:.., supplements",
}
module.exports = prompt_map;