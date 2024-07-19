class Event {
    constructor(name, description) {
      this.name = name;
      this.description = description;
      this.availableTickets = []; // empty array to store tickets
    }

    addAvailableTickets(name, price){
        // ticket is already in the array
        const existingTicket = this.availableTickets.find(ticket => ticket.name === name);
        
        if (existingTicket) {
            console.warn(`Ticket type "${name}" already exists.`);
            return;
          }
        // Add new ticket
        this.availableTickets.push({ name, price });
    }

    allTickets() {
        if (this.availableTickets.length === 0) {
          return `${this.name} - No tickets available.`;
        }
    
        // Map over the tickets array to create a string
        const ticketsString = this.availableTickets.map((ticket, index) => `${index + 1}. ${ticket.name} ($${ticket.price})`).join(' ');
    
        return `${this.name} - All tickets: ${ticketsString}`;
      }

    searchTickets(lowerBound, upperBound) {
        // Handle edge cases: ensure lowerBound <= upperBound
        // TO-DO need to handle erroneous max input of 1000, 1100, 1200, or 11100 output at invalid price range
        if (lowerBound > upperBound) {
            console.error('Invalid price range.');
            return `${this.name} - Invalid price range.`;
        }
        // Filter tickets within the specified price range
        const eligibleTickets = this.availableTickets.filter(ticket => ticket.price >= lowerBound && ticket.price <= upperBound);
    
        // Check if there are any eligible tickets
        if (eligibleTickets.length === 0) {
            return `${this.name} - No tickets available.`;
            }
        // Generate the string representation of eligible tickets
        const ticketsString = eligibleTickets.map((ticket, index) => `${index + 1}. ${ticket.name} ($${ticket.price})`).join(' ');
    
        return `${this.name} - Eligible tickets: ${ticketsString}`;
    }

    cheapestTicket() {
        // Find the cheapest ticket
        const sortedTickets = this.availableTickets.sort((a, b) => a.price - b.price);

        return sortedTickets.length > 0 ? `${sortedTickets[0].name} ($${sortedTickets[0].price})` : 'No tickets available.';
      }

  }

const eventArray = new Array();

// example object from instructions
const eventObj1 = new Event(
    "KLOS Golden Gala",
    "An evening with hollywood vampires"
  );

const eventObj2 = new Event(
    "Kwanzaa Celebration",
    "An evening with family together at Daaimah's house"
  );

const eventObj3 = new Event(
    "BET Awards",
    "An evening with the network BET giving awards to reputable black artists"
  );

eventArray.push(eventObj1, eventObj2, eventObj3);
// console.log(eventArray);

document.addEventListener('DOMContentLoaded', () => {
    // Handler when the DOM is fully loaded
    let html = '';
    eventArray.forEach((item) => {
      html += `<li>${item.name} - ${item.description}`;
    });
    document.querySelector('#event').innerHTML = html;
  });

console.log(eventObj2.addAvailableTickets("General Admission", 25))
eventObj2.addAvailableTickets("Floor Seating", 80)
eventObj3.addAvailableTickets("Orchestra", 300)
eventObj3.addAvailableTickets("Mezzanine", 200)
eventObj3.addAvailableTickets("Balcony", 100)


document.addEventListener('DOMContentLoaded', () => {
    // Attach event listener to the Search Tickets button
    document.getElementById('searchTicketsBtn').addEventListener('click', () => {
      const lowerBound = document.getElementById('lowerBound').value;
      const upperBound = document.getElementById('upperBound').value;
     
      // Initialize an empty string to accumulate results
      let ticketsResult = '';

      // Iterate over all events and aggregate search results
      eventArray.forEach((event, index) => {
        const result = event.searchTickets(lowerBound, upperBound);
        if (result !== `${event.name} - No tickets available.`) { // Optionally filter out "No tickets available" messages
          ticketsResult += `<p>${index + 1}. ${result}</p>`; // Add event number for clarity
        }
      });
  
      document.getElementById('ticketsResult').innerHTML = ticketsResult;

    });
  
    // Attach event listener to the Show Cheapest Ticket button
    document.getElementById('cheapestTicketBtn').addEventListener('click', () => {
        let cheapestEventInfo = '';
        let minPrice = Infinity;
    
        // Iterate over all events to find the cheapest ticket
        eventArray.forEach(event => {
          const cheapestTicket = event.cheapestTicket();
          const ticketPrice = parseFloat(cheapestTicket.split('$')[1]); // Extract price as float
          if (ticketPrice < minPrice && ticketPrice > 0) { // Ensure it's not "No tickets available"
            minPrice = ticketPrice;
            cheapestEventInfo = `${event.name} - ${cheapestTicket}`;
          }
        });
    
        document.getElementById('cheapestTicketResult').innerText = cheapestEventInfo || 'No tickets available across all events.';
  });
});