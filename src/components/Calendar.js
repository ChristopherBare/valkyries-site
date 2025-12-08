// TeamCalendar.jsx (or Calendar.js)
import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import './Calendar.css';

/* -------- helpers -------- */
const MOBILE_BREAKPOINT = 520; // px — tweak to taste

function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
    );
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
        window.addEventListener('resize', onResize, { passive: true });
        return () => window.removeEventListener('resize', onResize);
    }, [breakpoint]);
    return isMobile;
}

/* -------- Modal rendered via portal -------- */
function EventModal({ open, onClose, event }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!open) return;
        const prevOverflow = document.body.style.overflow;
        const raf = requestAnimationFrame(() => {
            document.body.style.overflow = 'hidden';
            setVisible(true);
        });
        return () => {
            cancelAnimationFrame(raf);
            document.body.style.overflow = prevOverflow;
            setVisible(false);
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && onClose?.();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open || !event) return null;

    const { title, startStr, endStr, extendedProps = {}, url } = event;
    const { location, description } = extendedProps;

    return ReactDOM.createPortal(
        <div
            className={`modal-overlay ${visible ? 'is-open' : ''}`}
            onClick={onClose}
            aria-hidden="true"
        >
            <div
                className={`modal-card ${visible ? 'is-open' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label={title || 'Event details'}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="modal-close" onClick={onClose} aria-label="Close" type="button">
                        ✕
                    </button>
                </div>

                <div className="modal-body">
                    <p className="modal-row">
                        <strong>When:</strong> {startStr}{endStr ? ` – ${endStr}` : ''}
                    </p>
                    {location && <p className="modal-row"><strong>Where:</strong> {location}</p>}
                    {description && (
                        <div className="modal-desc">
                            <strong>Details:</strong>
                            <p>{description}</p>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    {url && (
                        <a className="modal-btn" href={url} target="_blank" rel="noreferrer">
                            Open in Google Calendar
                        </a>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}

export default function TeamCalendar() {
    const calendarRef = useRef(null);
    const isMobile = useIsMobile();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [clickedEvent, setClickedEvent] = useState(null);

    const apiKey = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
    const calendarId = process.env.REACT_APP_GOOGLE_CALENDAR_ID || 'primary';

    // Choose view + toolbar + button text based on screen size
    const initialView = isMobile ? 'listMonth' : 'dayGridMonth';
    const headerToolbar = isMobile
        ? { left: 'prev,next', center: 'title', right: 'listMonth' }
        : { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth' };

    const buttonText = isMobile
        ? { today: 'Today', dayGridMonth: 'Mon', timeGridWeek: 'Wk', timeGridDay: 'Day', listMonth: 'List' }
        : { today: 'Today', dayGridMonth: 'Month', timeGridWeek: 'Week', timeGridDay: 'Day', listMonth: 'List' };

    // Keep view in sync when resizing across the breakpoint
    useEffect(() => {
        const api = calendarRef.current?.getApi?.();
        if (!api) return;
        const target = isMobile ? 'listMonth' : 'dayGridMonth';
        if (api.view?.type !== target) {
            api.changeView(target);
        }
    }, [isMobile]);

    const handleEventClick = (info) => {
        info.jsEvent.preventDefault();
        setClickedEvent({
            title: info.event.title,
            startStr: formatDateTime(info.event.start, info.event.allDay),
            endStr: info.event.end ? formatDateTime(info.event.end, info.event.allDay) : '',
            extendedProps: {
                location: info.event.extendedProps.location,
                description: info.event.extendedProps.description,
            },
            url: info.event.url,
        });
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setClickedEvent(null);
    };

    return (
        <section className="calendar" id="calendar">
            <div className="container">
                <h2>Team Calendar</h2>

                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, googleCalendarPlugin]}
                    initialView={initialView}
                    headerToolbar={headerToolbar}
                    buttonText={buttonText}
                    height="auto"
                    expandRows
                    dayMaxEvents={isMobile ? false : 3}   // no "+more" bubble on tiny screens
                    googleCalendarApiKey={apiKey}
                    events={{ googleCalendarId: calendarId }}
                    eventClick={handleEventClick}
                    navLinks
                    editable={false}
                    selectable={false}
                    eventTimeFormat={{ hour: 'numeric', minute: '2-digit', meridiem: 'short' }}
                />

                <EventModal open={dialogOpen} onClose={closeDialog} event={clickedEvent} />
            </div>
        </section>
    );
}

function formatDateTime(date, isAllDay) {
    if (!date) return '';
    if (isAllDay) {
        return date.toLocaleDateString(undefined, {
            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
        });
    }
    const d = date.toLocaleDateString(undefined, {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
    });
    const t = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
    return `${d}, ${t}`;
}
