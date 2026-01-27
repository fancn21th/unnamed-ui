// 先注释掉 先用antd的默认实现
// import React, { useState, useMemo, useEffect, useRef } from 'react';
// import styled from 'styled-components';
// import { Input, Button, Select } from 'antd';
// import { CalendarOutlined, LeftOutlined, RightOutlined, DownOutlined } from '@ant-design/icons';
// import dayjs, { Dayjs } from 'dayjs';

// interface DatetimeSelectProps {
//   value?: [Date, Date];
//   onChange?: (value: [Date, Date]) => void;
//   label?: string;
//   placeholder?: string;
// }

// const DatetimeSelect: React.FC<DatetimeSelectProps> = ({ value, onChange, label = '时间选择器', placeholder = '请选择日期时间' }) => {
//   const [visible, setVisible] = useState(false);
//   const [tempDate, setTempDate] = useState<Dayjs>(dayjs());
//   const [selectedDate, setSelectedDate] = useState<Dayjs | null>(value?.[0] ? dayjs(value[0]) : null);
//   const [startHour, setStartHour] = useState<number>(value?.[0] ? dayjs(value[0]).hour() : 9);
//   const [startMinute, setStartMinute] = useState<number>(value?.[0] ? dayjs(value[0]).minute() : 0);
//   const [endHour, setEndHour] = useState<number>(value?.[1] ? dayjs(value[1]).hour() : 18);
//   const [endMinute, setEndMinute] = useState<number>(value?.[1] ? dayjs(value[1]).minute() : 0);

//   const containerRef = useRef<HTMLDivElement>(null);
//   const startHourRef = useRef<HTMLDivElement>(null);
//   const startMinuteRef = useRef<HTMLDivElement>(null);
//   const endHourRef = useRef<HTMLDivElement>(null);
//   const endMinuteRef = useRef<HTMLDivElement>(null);

//   // 点击外部关闭面板
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
//         setVisible(false);
//       }
//     };

//     if (visible) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [visible]);

//   // 初始化时滚动到选中的时间位置
//   useEffect(() => {
//     if (visible) {
//       // 使用 setTimeout 确保 DOM 已渲染
//       setTimeout(() => {
//         scrollToCenter(startHourRef, startHour);
//         scrollToCenter(startMinuteRef, startMinute);
//         scrollToCenter(endHourRef, endHour);
//         scrollToCenter(endMinuteRef, endMinute);
//       }, 0);
//     }
//   }, [visible]);

//   // 生成日历数据
//   const calendarDays = useMemo(() => {
//     const year = tempDate.year();
//     const month = tempDate.month();
//     const firstDay = dayjs(`${year}-${month + 1}-01`);
//     const lastDay = firstDay.endOf('month');
//     const startWeekday = firstDay.day();
//     const daysInMonth = lastDay.date();

//     const days: Array<{ date: number; isCurrentMonth: boolean; fullDate: Dayjs }> = [];

//     // 上个月的天数
//     const prevMonthLastDay = firstDay.subtract(1, 'day');
//     for (let i = startWeekday - 1; i >= 0; i--) {
//       days.push({
//         date: prevMonthLastDay.date() - i,
//         isCurrentMonth: false,
//         fullDate: prevMonthLastDay.subtract(i, 'day'),
//       });
//     }

//     // 当前月的天数
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push({
//         date: i,
//         isCurrentMonth: true,
//         fullDate: dayjs(`${year}-${month + 1}-${i}`),
//       });
//     }

//     // 下个月的天数补齐
//     const remainingDays = 42 - days.length;
//     for (let i = 1; i <= remainingDays; i++) {
//       days.push({
//         date: i,
//         isCurrentMonth: false,
//         fullDate: lastDay.add(i, 'day'),
//       });
//     }

//     return days;
//   }, [tempDate]);

//   // 生成小时列表
//   const hours = Array.from({ length: 24 }, (_, i) => i);
//   // 生成分钟列表
//   const minutes = Array.from({ length: 60 }, (_, i) => i);

//   // 生成年份选项
//   const yearOptions = Array.from({ length: 50 }, (_, i) => {
//     const year = dayjs().year() - 25 + i;
//     return { label: `${year}`, value: year };
//   });

//   // 生成月份选项
//   const monthOptions = Array.from({ length: 12 }, (_, i) => ({
//     label: `${i + 1}月`,
//     value: i,
//   }));

//   const formatDisplay = () => {
//     if (selectedDate) {
//       return `${selectedDate.format('YYYY年M月D日')} ${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}-${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
//     }
//     return '';
//   };

//   const handlePrevMonth = () => {
//     setTempDate(tempDate.subtract(1, 'month'));
//   };

//   const handleNextMonth = () => {
//     setTempDate(tempDate.add(1, 'month'));
//   };

//   const handleMonthChange = (month: number) => {
//     setTempDate(tempDate.month(month));
//   };

//   const handleYearChange = (year: number) => {
//     setTempDate(tempDate.year(year));
//   };

//   const handleDateClick = (day: Dayjs) => {
//     setSelectedDate(day);
//   };

//   const handleConfirm = () => {
//     if (selectedDate) {
//       const start = selectedDate.hour(startHour).minute(startMinute).second(0).millisecond(0);
//       const end = selectedDate.hour(endHour).minute(endMinute).second(0).millisecond(0);
//       onChange?.([start.toDate(), end.toDate()]);
//       setVisible(false);
//     }
//   };

//   const handleCancel = () => {
//     // 重置为初始值
//     if (value) {
//       setSelectedDate(dayjs(value[0]));
//       setStartHour(dayjs(value[0]).hour());
//       setStartMinute(dayjs(value[0]).minute());
//       setEndHour(dayjs(value[1]).hour());
//       setEndMinute(dayjs(value[1]).minute());
//     } else {
//       setSelectedDate(null);
//     }
//     setVisible(false);
//   };

//   const isSelectedDate = (day: Dayjs) => {
//     return selectedDate && day.isSame(selectedDate, 'day');
//   };

//   const scrollToCenter = (ref: React.RefObject<HTMLDivElement>, index: number, smooth: boolean = false) => {
//     if (ref.current) {
//       const itemHeight = 32; // 与DateCell高度一致
//       const visibleRows = 7;
//       const centerIndex = 3; // 第4行（索引从0开始）
//       const scrollTop = (index - centerIndex) * itemHeight;

//       if (smooth) {
//         ref.current.scrollTo({ top: Math.max(0, scrollTop), behavior: 'smooth' });
//       } else {
//         ref.current.scrollTop = Math.max(0, scrollTop);
//       }
//     }
//   };

//   const handleStartHourClick = (hour: number) => {
//     setStartHour(hour);
//     scrollToCenter(startHourRef, hour, true);
//   };

//   const handleStartMinuteClick = (minute: number) => {
//     setStartMinute(minute);
//     scrollToCenter(startMinuteRef, minute, true);
//   };

//   const handleEndHourClick = (hour: number) => {
//     setEndHour(hour);
//     scrollToCenter(endHourRef, hour, true);
//   };

//   const handleEndMinuteClick = (minute: number) => {
//     setEndMinute(minute);
//     scrollToCenter(endMinuteRef, minute, true);
//   };

//   return (
//     <Container ref={containerRef}>
//       <Label>{label}</Label>
//       <Input
//         value={formatDisplay()}
//         placeholder={placeholder}
//         readOnly
//         onClick={() => setVisible(!visible)}
//         suffix={<CalendarOutlined />}
//         style={{ cursor: 'pointer' }}
//       />
//       {visible && (
//         <DropdownPanel>
//           <PanelHeader>
//             <MonthYearSelector>
//               <Select
//                 value={tempDate.month()}
//                 onChange={handleMonthChange}
//                 options={monthOptions}
//                 suffixIcon={<DownOutlined />}
//                 popupMatchSelectWidth={false}
//                 style={{ width: 70 }}
//               />
//               <Select
//                 value={tempDate.year()}
//                 onChange={handleYearChange}
//                 options={yearOptions}
//                 suffixIcon={<DownOutlined />}
//                 popupMatchSelectWidth={false}
//                 style={{ width: 85 }}
//               />
//             </MonthYearSelector>
//             <NavigationButtons>
//               <NavButton onClick={handlePrevMonth}>
//                 <LeftOutlined />
//               </NavButton>
//               <NavButton onClick={handleNextMonth}>
//                 <RightOutlined />
//               </NavButton>
//             </NavigationButtons>
//             <TimeDisplay>
//               {String(startHour).padStart(2, '0')}:{String(startMinute).padStart(2, '0')} - {String(endHour).padStart(2, '0')}:
//               {String(endMinute).padStart(2, '0')}
//             </TimeDisplay>
//           </PanelHeader>

//           <ContentWrapper>
//             <LeftSection>
//               <CalendarGrid>
//                 <WeekRow>
//                   {['日', '一', '二', '三', '四', '五', '六'].map(day => (
//                     <WeekDay key={day}>{day}</WeekDay>
//                   ))}
//                 </WeekRow>
//                 {Array.from({ length: 6 }).map((_, weekIndex) => (
//                   <DateRow key={weekIndex}>
//                     {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, index) => (
//                       <DateCell
//                         key={index}
//                         $isCurrentMonth={day.isCurrentMonth}
//                         $isSelected={isSelectedDate(day.fullDate)}
//                         onClick={() => handleDateClick(day.fullDate)}
//                       >
//                         {day.date}
//                       </DateCell>
//                     ))}
//                   </DateRow>
//                 ))}
//               </CalendarGrid>
//             </LeftSection>

//             <RightSection>
//               <TimeSection>
//                 <TimeColumn>
//                   <TimeScrollArea ref={startHourRef}>
//                     {hours.map(hour => (
//                       <TimeItem key={`start-hour-${hour}`} $selected={hour === startHour} onClick={() => handleStartHourClick(hour)}>
//                         {String(hour).padStart(2, '0')}
//                       </TimeItem>
//                     ))}
//                   </TimeScrollArea>
//                 </TimeColumn>
//                 <div>:</div>
//                 <TimeColumn>
//                   <TimeScrollArea ref={startMinuteRef}>
//                     {minutes.map(minute => (
//                       <TimeItem key={`start-minute-${minute}`} $selected={minute === startMinute} onClick={() => handleStartMinuteClick(minute)}>
//                         {String(minute).padStart(2, '0')}
//                       </TimeItem>
//                     ))}
//                   </TimeScrollArea>
//                 </TimeColumn>
//                 <div>-</div>
//                 <TimeColumn>
//                   <TimeScrollArea ref={endHourRef}>
//                     {hours.map(hour => (
//                       <TimeItem key={`end-hour-${hour}`} $selected={hour === endHour} onClick={() => handleEndHourClick(hour)}>
//                         {String(hour).padStart(2, '0')}
//                       </TimeItem>
//                     ))}
//                   </TimeScrollArea>
//                 </TimeColumn>
//                 <div>:</div>
//                 <TimeColumn>
//                   <TimeScrollArea ref={endMinuteRef}>
//                     {minutes.map(minute => (
//                       <TimeItem key={`end-minute-${minute}`} $selected={minute === endMinute} onClick={() => handleEndMinuteClick(minute)}>
//                         {String(minute).padStart(2, '0')}
//                       </TimeItem>
//                     ))}
//                   </TimeScrollArea>
//                 </TimeColumn>
//               </TimeSection>
//             </RightSection>
//           </ContentWrapper>

//           <Footer>
//             <Button onClick={handleCancel}>取消</Button>
//             <Button type="primary" onClick={handleConfirm}>
//               确定
//             </Button>
//           </Footer>
//         </DropdownPanel>
//       )}
//     </Container>
//   );
// };

// const Container = styled.div`
//   position: relative;
//   width: 100%;
//   z-index: 100;
// `;

// const Label = styled.div`
//   font-size: 14px;
//   color: #1e1d26;
//   margin-bottom: 8px;
// `;

// const DropdownPanel = styled.div`
//   position: absolute;
//   top: calc(100% + 4px);
//   left: 0;
//   width: 520px;
//   background: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
//   padding: 16px;
//   z-index: 1000;
// `;

// const ContentWrapper = styled.div`
//   display: flex;
//   gap: 12px;
// `;

// const LeftSection = styled.div`
//   flex: 1;
// `;

// const RightSection = styled.div`
//   //   width: 180px;
// `;

// const PanelHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 12px;
// `;

// const MonthYearSelector = styled.div`
//   display: flex;
//   gap: 8px;

//   .ant-select {
//     .ant-select-selector {
//       border-radius: 4px;
//       border: 1px solid #d9d9d9;
//       font-size: 14px;
//       height: 28px;
//       padding: 0 8px;
//     }

//     .ant-select-selection-item {
//       line-height: 26px;
//     }

//     &:hover .ant-select-selector {
//       border-color: #40a9ff;
//     }
//   }
// `;

// const NavigationButtons = styled.div`
//   display: flex;
//   gap: 4px;
// `;

// const NavButton = styled.button`
//   width: 28px;
//   height: 28px;
//   border: none;
//   background: transparent;
//   border-radius: 4px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: #666;

//   &:hover {
//     background: #f5f5f5;
//     color: #1890ff;
//   }
// `;

// const TimeDisplay = styled.div`
//   font-size: 14px;
//   color: #1e1d26;
//   font-weight: 500;
// `;

// const CalendarGrid = styled.div`
//   /* 移除底部边距，因为现在是左右布局 */
// `;

// const WeekRow = styled.div`
//   display: grid;
//   grid-template-columns: repeat(7, 1fr);
// `;

// const WeekDay = styled.div`
//   text-align: center;
//   font-size: 12px;
//   color: #999;
//   padding: 6px 0;
//   font-weight: 400;
// `;

// const DateRow = styled.div`
//   display: grid;
//   grid-template-columns: repeat(7, 1fr);
//   gap: 0;
// `;

// const DateCell = styled.div<{
//   $isCurrentMonth: boolean;
//   $isSelected: boolean;
// }>`
//   text-align: center;
//   padding: 5px 0;
//   font-size: 14px;
//   cursor: pointer;
//   position: relative;
//   height: 32px;
//   line-height: 22px;
//   color: ${props => (props.$isCurrentMonth ? '#262626' : '#bfbfbf')};
//   background: transparent;

//   ${props =>
//     props.$isSelected &&
//     `
//     &::after {
//       content: '';
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       width: 26px;
//       height: 26px;
//       background: #1890ff;
//       border-radius: 50%;
//       z-index: -1;
//     }
//     color: #fff;
//     font-weight: 500;
//   `}

//   &:hover {
//     background: ${props => (props.$isSelected ? 'transparent' : '#f5f5f5')};
//   }
// `;

// const TimeSection = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 4px;
//   height: 100%;

//   > div:not([class]) {
//     display: flex;
//     align-items: center;
//     font-size: 16px;
//     color: #595959;
//     font-weight: 500;
//     // padding: 0 2px;
//   }
// `;

// const TimeColumn = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//   min-width: 38px;
// `;

// const TimeScrollArea = styled.div`
//   height: 224px; /* 7行 × 32px */
//   overflow-y: auto;
//   border: none;
//   border-radius: 4px;
//   padding: 0;
//   background: transparent;

//   /* 隐藏滚动条 */
//   scrollbar-width: none; /* Firefox */
//   -ms-overflow-style: none; /* IE and Edge */

//   &::-webkit-scrollbar {
//     display: none; /* Chrome, Safari, Opera */
//   }
// `;

// const TimeItem = styled.div<{ $selected: boolean }>`
//   padding: 0;
//   text-align: center;
//   font-size: 14px;
//   cursor: pointer;
//   border-radius: 0;
//   background: ${props => (props.$selected ? '#F7F7FF' : 'transparent')};
//   color: ${props => (props.$selected ? '#7B61FF' : '#595959')};
//   margin: 0;
//   padding: 5px 0;
//   line-height: 22px;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   &:hover {
//     background: ${props => (props.$selected ? '#F7F7FF' : '#f5f5f5')};
//   }
// `;

// const Footer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 8px;
//   padding-top: 16px;
//   margin-top: 12px;
//   border-top: 1px solid #f0f0f0;
// `;

// export default DatetimeSelect;
