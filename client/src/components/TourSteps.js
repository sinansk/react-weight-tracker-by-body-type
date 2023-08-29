import UpdateProfileModal from "./modals/UpdateProfileModal";

export const myStatsSteps = [
    {
        target: ".step1",
        content: "Welcome to the Fitness Calculator App! This app will help you to calculate and track your ideal weight, body fat, daily calorie need and ideal measurements. Let's get started!",
        disableBeacon: true,
        autoStart: true,
    },
    {
        target: ".step2",
        content: "You can see your actual information in here.",
    },
    {
        target: ".step3",
        content: "You can see your calculated results in here.",
    },
    {
        target: ".step4",
        content: "You can see your your actual body measurements and ideal body measurements in here.",
    },
    {
        target: ".step5",
        content: "You can see your past records from here.",
        position: "bottom",
    },
    {
        target: ".step6",
        content: "You can add new record from here.",
    },
    {
        target: ".calorie-tracker",
        content: "You can save and see your calorie records from here.",
    },
]

export const calorieTrackerSteps = [
    {
        target: ".calorie-tracker-page",
        content: "You can control your calorie intake from here.",
        disableBeacon: true,
        autoStart: true,
    },
    {
        target: ".search-food",
        content: "You can search for food and add to your diary from here.",
    },
    {
        target: ".add-custom-food",
        content: "If you want to add your own food, you can add and save to future use from here.",
    },
    {
        target: ".calendar",
        content: "You have full controls on your diary. You can copy, delete and save as routine your diary from here.",
    },
    {
        target: ".copy-diary",
        content: "You can copy your records to another day from here.",
    },
    {
        target: ".set-routine",
        content: "You can set your diary as a template from here.",
    },
    {
        target: ".choose-routine",
        content: "You can use your template from here.",
    },
]