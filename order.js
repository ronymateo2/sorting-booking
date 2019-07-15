let bookingsData = [
  {
    id: 1,
    start: 3,
    end: 1
  },
  {
    id: 2,
    start: 1,
    end: 3
  },
  {
    id: 3,
    start: 3,
    end: 1
  },
  {
    id: 4,
    start: 2,
    end: 2
  },
  {
    id: 5,
    start: 3,
    end: 1
  },
  {
    id: 6,
    start: 2,
    end: 3
  },
  {
    id: 7,
    start: 1,
    end: 3
  },
  {
    id: 8,
    start: 1,
    end: 1
  },
  {
    id: 9,
    start: 3,
    end: 3
  },
  {
    id: 10,
    start: 3,
    end: 2
  },
  {
    id: 11,
    start: 3,
    end: 3
  },
  {
    id: 12,
    start: 3,
    end: 2
  },
  {
    id: 13,
    start: 1,
    end: 1
  },
  {
    id: 14,
    start: 1,
    end: 3
  },
  {
    id: 15,
    start: 3,
    end: 2
  },
  {
    id: 16,
    start: 3,
    end: 2
  },
  {
    id: 17,
    start: 1,
    end: 3
  },
  {
    id: 18,
    start: 3,
    end: 3
  }
];

/**
 * @param {[]} bookings
 */
function caculateRelocation(bookings) {
  sortedBookings = getIO(bookings);

  const arrayOfLinkedList = [];

  while (sortedBookings.length > 0) {
    const queue = [sortedBookings.shift()];
    let head = new LinkedList(queue[0]);
    let currentNode = head;
    let direction = "->";
    while (queue.length > 0) {
      let currentBooking = queue.shift();
      if (direction === "->") {
        let nextBooking = getNextNode(currentBooking, sortedBookings);
        if (nextBooking) {
          removeNode(nextBooking, sortedBookings);
          currentNode.next = new LinkedList(nextBooking);
          currentNode = currentNode.next;
          queue.push(nextBooking);
          direction = "<-";
        }
      } else if (direction === "<-") {
        let previousNode = getPreviusNode(head.value, sortedBookings);
        if (previousNode) {
          removeNode(previousNode, sortedBookings);
          const newHead = new LinkedList(previousNode);
          newHead.next = head;
          head = newHead;
          queue.push(previousNode);
        }
      }
    }

    arrayOfLinkedList.push(head);
  }

  const arrayOfArrays = arrayOfLinkedList.map(head => {
    const r = [];
    while (head !== null) {
      r.push(head.value);
      head = head.next;
    }
    return r;
  });

  return arrayOfArrays.reduce((acc, val) => acc.concat(val), []).map(b => b.id);
}

/**
 * @param {[]} bookings
 */
function getIO(bookings) {
  return bookings
    .map(node => {
      const ins = bookings.filter(b => node.start === b.end).length;
      const outs = bookings.filter(b => node.end === b.start).length;
      return {
        io: ins + outs,
        booking: node
      };
    })
    .sort((a, b) => b.io - a.io)
    .map(sorted => sorted.booking);
}

function removeNode(node, bookings) {
  let index = bookings.indexOf(node);
  bookings.splice(index, 1);
}

/**
 *
 * @param {any} node
 * @param {[] bookings
 */
function getNextNode(node, bookings) {
  return bookings.find(b => node.end === b.start);
}

function getPreviusNode(node, bookings) {
  return bookings.find(b => node.start === b.end);
}

const LinkedList = function(value) {
  this.value = value;
  this.next = null;
};

console.log(caculateRelocation(bookingsData));
