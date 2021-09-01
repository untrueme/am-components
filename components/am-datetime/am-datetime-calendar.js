
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
                font: var(--font-md);
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
                color:  var(--black-lightest);
                font-weight: 500;
            }

            .week__day:nth-last-child(-n+2) {
                color: var(--negative-base);
            }

            .days {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                margin: 8px;
                border-top: 1px solid var(--grey-base);
            }            
            .days__day {
                text-align: center;
                height: 24px;
                width: 24px;
                cursor: pointer;

                line-height: 24px;
            }

            .days__day:nth-child(7n-1), .days__day:nth-child(7n)
            {
                color: var(--negative-base);
            }

            .days__day:hover {
                color: var(--black-dark);
                background: var(--grey-base);
                border-radius: 3px;
            }
        `
    }

    render() {
        const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        const monthStart = dayjs().startOf('month');
        const monthEnd = dayjs().endOf('month');
        const startDate = dayjs(monthStart).startOf('isoWeek');
        const endDate = dayjs(monthEnd).endOf('isoWeek');
        const dateFormat = "D";
        let day = startDate;
        const days = [];
        while (day <= endDate) {
            const dayInfo = {
                day: day,
                formattedDay: day.format(dateFormat)
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
                        ${days.map(dayInfo => html`
                            <div .day=${dayInfo.day} class="days__day" @click="${this.onDayClick}">${dayInfo.formattedDay}</div>
				        `)}
                    </div>
                </div>
            </div>
        `;
    }

    onDayClick(event) {
        this.dispatchEvent(new CustomEvent('on-day-click', { detail: { day: event.currentTarget.day } }))
    }
}

customElements.define('am-datetime-calendar', AmDateTimeCalendar);
