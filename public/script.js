const STORE = [
    {
        destination: "Greece",
        budget: 4000,
        costs:
        [
            { name: "airfare", value: 1000 },
            { name: "lodging", value: 900 }
        ],
        
        get airfare() {
            const findAirfare = item => item.name == "airfare";
            const airfare = this.costs.find(findAirfare);
            return airfare.value;
        },
        get lodging() {
            const findLodging = item => item.name == "lodging";
            const lodging = this.costs.find(findLodging);
            return lodging.value;
        }
    },
    {
        destination: "Australia",
        budget: 5000,
        costs:
        [
            { name: "airfare", value: 1300 },
            { name: "lodging", value: 1000 }
        ],
        get airfare() {
            const findAirfare = item => item.name == "airfare";
            const airfare = (this.costs).find(findAirfare);
            return airfare.value;
        },
        get lodging() {
            const findLodging = item => item.name == "lodging";
            const lodging = (this.costs).find(findLodging);
            return lodging.value;
        }
    }
];

function calculateAmountLeft(item) {
    const budget = item.budget;
    const expenses = parseInt(item.airfare) + parseInt(item.lodging);
    const amountLeft = budget - expenses;
    console.log(amountLeft);
    return amountLeft;
}

function generateItemElement(item, itemIndex, template) {
    template.find('.js-trip-item').attr("value", item.destination);
    template.find('.js-trip-item-budget').attr("value", item.budget);
    template.find('.js-trip-item-airfare').attr("value", item.airfare);
    template.find('.js-trip-item-lodging').attr("value", item.lodging);
    const amt_left = calculateAmountLeft(item);
    template.find('.js-budget-calc').text(amt_left);
    template.find('.js-item-index-element').attr('data-item-index', itemIndex);
    return template.html();
}

function generateTripItemsString(tripList) {
    console.log("Generating trip list element");
    const items = tripList.map(function (item, index) {
        const template = $('#list-item-template').clone();
        return generateItemElement(item, index, template);
    });
    return items.join("");
}

function renderTripList() {
    console.log('`renderTripList` ran');
    // generate HTML for the list
    const tripListItemsString = generateTripItemsString(STORE);
    // insert that HTML into the DOM
    $('.js-trip-list').html(tripListItemsString);

}

function addItemToTripList(itemDestination, itemBudget, itemAirfare, itemLodging) {
    console.log('Adding stuff to Trip list');
    STORE.push({ destination: itemDestination, budget: itemBudget, airfare: itemAirfare, lodging: itemLodging });
}


function handleNewItemSubmit() {
    $('#js-trip-list-form').submit(function (event) {
        event.preventDefault();
        console.log('`handleNewItemSubmit` ran');

        const newItemElement = $('.js-trip-list-entry');
        const newItemElementBudget = $('.js-trip-list-entry-budget');
        const newItemElementAirfare = $( ".js-trip-list-entry-airfare");
        const newItemElementLodging = $('.js-trip-list-entry-lodging');
        const newItemDestination = newItemElement.val();
        const newItemBudget = newItemElementBudget.val();
        const newItemAirfare = newItemElementAirfare.val();
        const newItemLodging = newItemElementLodging.val();

        newItemElement.val('');
        newItemElementBudget.val('');
        newItemElementAirfare.val('');
        newItemElementLodging.val('');

        addItemToTripList(newItemDestination, newItemBudget, newItemAirfare, newItemLodging);
        renderTripList();
    });
}

function getItemIndexFromElement(item) {
    debugger;
    const itemIndexString = $(item)
        .closest('.js-item-index-element')
        .attr('data-item-index');
    console.log(itemIndexString);
    console.log('parseInt: ', parseInt(itemIndexString, 10));
    return parseInt(itemIndexString, 10);  
}

function deleteClickedItem(itemIndex) {
    console.log("Deleting li for item at index " + itemIndex);
    STORE.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
    $('.js-trip-list').on('click', 'js-item-delete', function (event) {
        console.log('`handleDeleteItemClicked` ran');
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        deleteClickedItem(itemIndex);
        renderTripList();
    });
}

function editClickedItem(itemIndex) {
    console.log('Editing item at index ' + itemIndex);
    //get the user's new input
    var newDestination = $('.js-trip-item').val();
    console.log(newDestination);
    var newBudget = $('.js-trip-item-budget').val();
    var newAirfare = $('.js-trip-item-airfare').val();
    var newLodging = $('.js-trip-item-lodging').val();
    
    //change appropriate entry in STORE
    STORE[itemIndex].destination = newDestination;
    STORE[itemIndex].budget = newBudget;
    STORE[itemIndex].costs[0].value = newAirfare;
    STORE[itemIndex].costs[1].value = newLodging;

    renderTripList();

    console.log(STORE[itemIndex]);
}

function handleEditItemClicked() {
    $('.js-saved-trips').on('submit', /*'.js-item-edit',*/ function (event) {
        console.log('handleEditItemClicked ran');
        var itemIndex = $(this).children().attr("data-item-index");
       
        editClickedItem(itemIndex);
        renderTripList();
    });

    //event.currentTarget.trip_id.value --> look for this 
    //git --> merge everything back to master and work on master
}

function handleTripList() {
    renderTripList();
    handleNewItemSubmit();
    handleDeleteItemClicked();
    handleEditItemClicked();
}

$(handleTripList);
