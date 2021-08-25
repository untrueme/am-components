
import { css, html, LitElement } from 'lit';
import dayjs from 'dayjs/esm/index.js';
import isoWeek from 'dayjs/esm/plugin/isoWeek/index.js';

dayjs.extend(isoWeek)
class AmDateTimeCalendar extends LitElement {
    static get styles() {
        return css`
            :host {
                display: block;
                user-select: none;
            }

            .calendar__header {
                display: flex;
            }
            .calendar__month {
                flex: 2;
            }
            .calendar__year {
                flex: 1;
            }

            .week {
                display: flex;
                flex-direction: row;
                margin: 8px;
            }
            .week__day {
                flex: 1;
                text-align: center;
                line-height: 18px;
                font-family: 'Golos Bold';
                font-weight: 500;
            }

            .days {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                margin: 16px 8px 8px;
            }
            .days__day {
                text-align: center;
                height: 24px;
                width: 24px;
                cursor: pointer;

                line-height: 24px;
            }
            .days__day:hover {
                color: var(--black-dark);
                background: var(--grey-base);
                border-radius: 3px;
            }
        `
    }

    render(){
        const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        const monthStart = dayjs().startOf('month');
		const monthEnd = dayjs().endOf('month');
		const startDate = dayjs(monthStart).startOf('isoWeek');
		const endDate = dayjs(monthEnd).startOf('isoWeek');
		const dateFormat = "D";
		let day = startDate;
		let formattedDate = "";
        const days = [];
        while (day <= endDate) {
            formattedDate = day.format(dateFormat);
            const dayInfo = {
                day,
                formattedDate,
            };
            days.push(dayInfo);
            day = day.add(1, 'day')
		};

        return html`
            <div class="calendar">
                <div id="content" class="calendar__content">
                    <div class="week">
                        ${weekDays.map(name => html`
                            <div class="week__day">${name}</div>
				        `)}
                    </div>
                    <div class="days">
                        ${days.map(day => html`
                            <div class="days__day">${day.formattedDate}</div>
				        `)}
                    </div>
                </div>
            </div>

        `;
    }
}

customElements.define('am-datetime-calendar', AmDateTimeCalendar);
