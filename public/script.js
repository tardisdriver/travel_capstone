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


const TRIP_LIST_ELEMENT_IDENTIFIER = '.js-trip-list';
const ITEM_DESTINATION_IDENTIFIER = '.js-trip-item';
const ITEM_BUDGET_IDENTIFIER = '.js-trip-item-budget';
const ITEM_AIRFARE_IDENTIFIER = '.js-trip-item-airfare';
const ITEM_LODGING_IDENTIFIER = '.js-trip-item-lodging';
const ITEM_TEMPLATE_IDENTIFIER = '#list-item-template';
const ITEM_INDEX_ATTRIBUTE = 'data-item-index';
const ITEM_INDEX_ELEMENT_IDENTIFIER = '.js-item-index-element';
const NEW_ITEM_FORM_IDENTIFIER = '#js-trip-list-form';
const NEW_ITEM_FORM_INPUT_IDENTIFIER = '.js-trip-list-entry';
const NEW_ITEM_FORM_INPUT_IDENTIFIER_BUDGET = '.js-trip-list-entry-budget';
const NEW_ITEM_FORM_INPUT_IDENTIFIER_AIRFARE = ".js-trip-list-entry-airfare";
const NEW_ITEM_FORM_INPUT_IDENTIFIER_LODGING = ".js-trip-list-entry-lodging";
const ITEM_AMOUNT_LEFT_IDENTIFIER = '.js-budget-calc';
const ITEM_DELETE_IDENTIFIER = '.js-item-delete';
const ITEM_EDIT_IDENTIFIER = '.js-item-edit';

function calculateAmountLeft(item) {
    const budget = item.budget;
    const expenses = parseInt(item.airfare) + parseInt(item.lodging);
    const amountLeft = budget - expenses;

    return amountLeft;
}

function generateItemElement(item, itemIndex, template) {
    template.find(ITEM_DESTINATION_IDENTIFIER).attr("value", item.destination);
    template.find(ITEM_BUDGET_IDENTIFIER).attr("value", item.budget);
    template.find(ITEM_AIRFARE_IDENTIFIER).attr("value", item.airfare);
    template.find(ITEM_LODGING_IDENTIFIER).attr("value", item.lodging);
    const amt_left = calculateAmountLeft(item);
    template.find(ITEM_AMOUNT_LEFT_IDENTIFIER).text(amt_left);
    template.find('.js-item-index-element').attr(ITEM_INDEX_ATTRIBUTE, itemIndex);
    return template.html();
}

function generateTripItemsString(tripList) {
    console.log("Generating trip list element");
    const items = tripList.map(function (item, index) {
        const template = $(ITEM_TEMPLATE_IDENTIFIER).clone();
        return generateItemElement(item, index, template);
    });
    return items.join("");
}

function renderTripList() {
    console.log('`renderTripList` ran');
    // generate HTML for the list
    const tripListItemsString = generateTripItemsString(STORE);
    // insert that HTML into the DOM
    $(TRIP_LIST_ELEMENT_IDENTIFIER).html(tripListItemsString);

}

function addItemToTripList(itemDestination, itemBudget, itemAirfare, itemLodging) {
    console.log('Adding stuff to Trip list');
    STORE.push({ destination: itemDestination, budget: itemBudget, airfare: itemAirfare, lodging: itemLodging });
}


function handleNewItemSubmit() {
    $(NEW_ITEM_FORM_IDENTIFIER).submit(function (event) {
        event.preventDefault();
        console.log('`handleNewItemSubmit` ran');

        const newItemElement = $(NEW_ITEM_FORM_INPUT_IDENTIFIER);
        const newItemElementBudget = $(NEW_ITEM_FORM_INPUT_IDENTIFIER_BUDGET);
        const newItemElementAirfare = $(NEW_ITEM_FORM_INPUT_IDENTIFIER_AIRFARE);
        const newItemElementLodging = $(NEW_ITEM_FORM_INPUT_IDENTIFIER_LODGING);
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

function getItemIndexFromElement(item, itemIndex) {
    debugger;
    const itemIndexString = $(item)
        .closest('.js-item-index-element')
        .attr('data-item-index', itemIndex);
    console.log('itemIndex ' + itemIndex);
    console.log('pareseInt: ', parseInt(itemIndexString, 10));
    return parseInt(itemIndexString, 10);
    
}

function deleteClickedItem(itemIndex) {
    console.log("Deleting li for item at index " + itemIndex);
    STORE.splice(itemIndex, 1);
}


function handleDeleteItemClicked() {
    $(TRIP_LIST_ELEMENT_IDENTIFIER).on('click', ITEM_DELETE_IDENTIFIER, function (event) {
        console.log('`handleDeleteItemClicked` ran');
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        deleteClickedItem(itemIndex);
        renderTripList();
    });
}

function editClickedItem(item, itemIndex) {
    console.log('Editing item at index ' + itemIndex);
    //get the user's new input
    var newDestination = $('.js-trip-item').val();
    var newBudget = $('.js-trip-item-budget').val();
    var newAirfare = $('.js-trip-item-airfare').val();
    var newLodging = $('.js-trip-item-lodging').val();
    
    //change appropriate entry in STORE
    //STORE[itemIndex].destination = newDestination;
}

function handleEditItemClicked() {
    console.log('handleEditItemClicked ran');
    $('#js-saved-trips').on('submit', ITEM_EDIT_IDENTIFIER, function (event) {
        console.log('handleEditItem ran');
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        console.log(itemIndex);
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
