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
        if PMIndicator == 'p' and (int(self.endTime[6:8]) + 12) < 24 and int(startTime[0:2]) != 12 and (
                int(startTime[0:2]) + 12 < int(self.endTime[6:8]) + 12):
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
            return ",('%s','%s',%d,%d)" % (
                self.getStartTime(), self.getEndTime(), self.so_id, i)

    def timeSlotInsertTuple(self):
        for i in self.trimAndSelectDays(self.days):
            return self.getStartTime(), self.getEndTime(), self.so_id, i


tuple_inserts = [
    (1, '12:00- 1:15p', 'MJ     ', '66'),
    (2, ' 1:30- 2:45p', 'MJ     ', '76'),
    (3, ' 8:00- 9:50 ', 'LW     ', '20'),
    (1844, ' 5:30- 8:20p', 'W      ', '110'),
    (1845, ' 5:30- 8:20p', 'W      ', '110'),
    (1846, '12:30- 1:20p', 'W      ', '60'),
    (1847, '12:30- 1:20p', 'W      ', '61'),
    (1848, ' 3:30- 5:20p', 'LW     ', '90')]

insertString = "insert into \"TimeSlot\" ( 'ts_start_time', 'ts_end_time' , so_id, d_id) VALUES "
insertSet = set()
for insert in tuple_inserts:
    TSG = TimeSlotGenerator(insert)
    if TSG.timeSlotInsertTuple() not in insertSet:
        insertString += "\n" + TSG.timeSlotInsert()
        insertSet.add(TSG.timeSlotInsertTuple())

print(insertString)
