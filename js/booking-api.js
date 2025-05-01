const CAL_API_KEY = 'cal_live_b71e74be4843980a2000a1dedfc6d5d2';
const EVENT_TYPES = {
    '30min': '12345', 
    '60min': '67890'  
};

document.getElementById('booking-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Scheduling...';
    
    try {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            eventType: document.getElementById('event-type').value,
            meetingTime: document.getElementById('meeting-time').value
        };
        
        const response = await createBooking(formData);
        
        
        window.location.href = `https://cal.com/booking/${response.booking.uid}`;
    } catch (error) {
        console.error('Booking failed:', error);
        alert('Booking failed. Please try again or contact support.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Schedule Meeting';
    }
});

async function createBooking({ name, email, eventType, meetingTime }) {
    const eventTypeId = EVENT_TYPES[eventType];
    if (!eventTypeId) throw new Error('Invalid event type');
    
    const duration = eventType === '30min' ? 30 : 60;
    const startTime = new Date(meetingTime);
    const endTime = new Date(startTime.getTime() + duration * 60000);
    
    const response = await fetch('https://api.cal.com/v1/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CAL_API_KEY}`
        },
        body: JSON.stringify({
            eventTypeId: eventTypeId,
            start: startTime.toISOString(),
            end: endTime.toISOString(),
            responses: {
                name: name,
                email: email,
                notes: 'Booking from custom website form'
            },
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: 'en',
            metadata: {}
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Booking request failed');
    }
    
    return await response.json();
}