import moment from "moment";

export const findDiaryEntryIndex = (calorieDiary, dateString) => {
    const index = calorieDiary.findIndex((entry) => {
        const formattedDate = moment(entry.date, "DD-MM-YYYY").format("DD-MM-YYYY");
        return formattedDate === dateString;
    });

    // If the entry is not found, findIndex() returns -1
    if (index !== -1) {
        const diaryEntry = calorieDiary[index];
        console.log("filteredDiary", diaryEntry)
        // Now you have access to the diary entry for the specified date
        return diaryEntry

    } else {
        // The entry for the specified date was not found
        console.log("Entry not found.");
    }

}



