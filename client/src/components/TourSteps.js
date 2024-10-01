export const myStatsSteps = [
    {
        target: ".mystats",
        content: "Welcome to the Fitness Calculator App! This app will help you to calculate and track your ideal weight, body fat, daily calorie need and ideal measurements. Let's get started!",
        disableBeacon: true,
        autoStart: true,
    },
    {
        target: ".actual-info",
        content: "You can see your actual information in here.",
        disableBeacon: true,
    },
    {
        target: ".calculated-results",
        content: "You can see your calculated results in here.",
        disableBeacon: true,
    },
    {
        target: ".measurements",
        content: "You can see your your actual body measurements and ideal body measurements in here.",
        disableBeacon: true,
    },
    {
        target: ".records",
        content: "You can see your past records from here.",
        disableBeacon: true,
        position: "top",
    },
    {
        target: ".new-record",
        content: "You can add new record from here.",
        disableBeacon: true,
    },
    {
        target: ".calorie-tracker",
        content: (
            <div>
                You can interact with your own components through the spotlight.
                <br />
                Click the menu above!
            </div>
        ),
        disableBeacon: true,
        hideCloseButton: true,
        hideFooter: true,
        position: "bottom"
    },

]

export const calorieTrackerSteps = [
    {
        target: ".calorie-tracker-page",
        content: "You can track your calorie from this page.",
        disableBeacon: true,
        disableOverlayClose: true,
        spotlightClicks: true,
    },
    {
        target: ".search-food",
        content: "You can search for food and add to your diary from here.",
        disableBeacon: true,
    },
    {
        target: ".add-custom-food",
        content: "If you want to add your own food, you can add and save to future use from here.",
        disableBeacon: true,
    },
    // {
    //     target: ".choose-routine",
    //     content: "You can use your template from here.",
    // },
]

export const calendarSteps = [

    {
        target: ".calendar",
        content: "You have full control over the calendar.",
        disableBeacon: true,
        hideCloseButton: true,
        hideFooter: true,
        spotlightClicks: true,
        styles: {
            options: {
                zIndex: 0,
            },
        },
    },
    {
        target: ".copy-diary",
        content: "You can copy your records to another day from here.",
        disableBeacon: true,
    },
    {
        target: ".delete-diary",
        content: "You can delete your records from here.",
        disableBeacon: true,
    },
    {
        target: ".set-routine",
        content: "You can set your diary as a template from here.",
        disableBeacon: true,
    },
]