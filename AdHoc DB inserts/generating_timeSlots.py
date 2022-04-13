dayLetterToDayIds = {'L': 1, 'M': 2, 'W': 3, 'J': 4, 'V': 5, 'S': 6}


class TimeSlotGenerator:

    def trimAndSelectDays(self, daysStr):
        daysStrTrimmed = daysStr.strip()
        daysList = list(daysStrTrimmed)
        daysIdList = list()
        for i in daysList:
            daysIdList.append(dayLetterToDayIds[i])
        return daysIdList

    def getStartTime(self):
        startTime = self.startTime[0:5]
        PMIndicator = self.endTime[11:12]
        if PMIndicator == 'p' and int(startTime[0:2]) != 12:
            startTime = str(int(startTime[0:2]) + 12) + (startTime[2:len(startTime)])
        return startTime

    def getEndTime(self):
        endTime = self.endTime[6:11]
        PMIndicator = self.endTime[11:12]
        if PMIndicator == 'p' and int(endTime[0:2]) != 12:
            endTime = str(int(endTime[0:2]) + 12) + (endTime[2:len(endTime)])
        return endTime

    def __init__(self, timeSlotTuple):
        self.so_id = timeSlotTuple[0]
        self.startTime = timeSlotTuple[1]
        self.endTime = timeSlotTuple[1]
        self.days = timeSlotTuple[2]
        self.seccion = timeSlotTuple[3]

    def timeSlotInsert(self):
        for i in self.trimAndSelectDays(self.days):
            print(
                "insert into \"TimeSlot\" ( 'ts_start_time', 'ts_end_time' , so_id, d_id) VALUES ('%s','%s',%d,%d);" % (
                self.getStartTime(), self.getEndTime(), self.so_id, i))


inserts = [(1, '12:00- 1:15p', 'MJ     ', '66'),
           (1848, ' 3:30- 5:20p', 'LW     ', '90')]

for insert in inserts:
    TSG = TimeSlotGenerator(insert)
    TSG.timeSlotInsert()
