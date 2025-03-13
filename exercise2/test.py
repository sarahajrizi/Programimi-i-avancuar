def f(l, t):
    r = []
    for i in range(len(l)):
        if l[i]["t"] == t:
            r.append(l[i])
    return r

# Usage example:
items = [
    {"id": 1, "t": "book", "price": 20},
    {"id": 2, "t": "food", "price": 10},
    {"id": 3, "t": "book", "price": 15},
    {"id": 4, "t": "food", "price": 5}
]
books = f(items, "book")

#refactor current code, with better variable names and function names
def filter_items_by_type(items, type):
    result = []
    for i in range(len(items)):
        if items[i]["t"] == type:
            result.append(items[i])
    return result

#add some test cases
def test_filter_items_by_type():
    items = [
        {"id": 1, "t": "book", "price": 20},
        {"id": 2, "t": "food", "price": 10},
        {"id": 3, "t": "book", "price": 15},
        {"id": 4, "t": "food", "price": 5}
    ]
    assert filter_items_by_type(items, "book") == [{"id": 1, "t": "book", "price": 20}, {"id": 3, "t": "book", "price": 15}]
    assert filter_items_by_type(items, "food") == [{"id": 2, "t": "food", "price": 10}, {"id": 4, "t": "food", "price": 5}]
    assert filter_items_by_type(items, "other") == []
    
    