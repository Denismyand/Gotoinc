var data = [
  { name: "Alice", age: 25, city: "New York", country: "USA" },
  { name: "Bob", age: 30, city: "Los Angeles", country: "USA" },
  { name: "Charlie", age: 25, city: "London", country: "UK" },
  { name: "David", age: 35, city: "New York", country: "USA" },
  { name: "Eve", age: 35, city: "Paris", country: "France" },
];
function groupBy(items, keys, filterFn) {
  if (filterFn === void 0) {
    filterFn = function () {
      return true;
    };
  }
  var groupingKeys = Array.isArray(keys) ? keys : [keys];
  var groupItems = function (data, level) {
    var keyOrFn = groupingKeys[level];
    var grouped = {};
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
      var item = data_1[_i];
      var key = typeof keyOrFn === "function" ? keyOrFn(item) : item[keyOrFn];
      var groupKey = key === undefined ? "undefined" : String(key);
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(item);
    }
    if (level < groupingKeys.length - 1) {
      for (var group in grouped) {
        grouped[group] = groupItems(grouped[group], level + 1);
      }
    }
    return grouped;
  };
  var filteredItems = items.filter(filterFn);
  console.log(groupItems(filteredItems, 0));
}
// Grouping by country
// groupBy(data, "country");
/*
  {
    "USA": [
      { name: "Alice", age: 25, city: "New York", country: "USA" },
      { name: "Bob", age: 30, city: "Los Angeles", country: "USA" },
      { name: "David", age: 35, city: "New York", country: "USA" }
    ],
    "UK": [
      { name: "Charlie", age: 25, city: "London", country: "UK" }
    ],
    "France": [
      { name: "Eve", age: 35, city: "Paris", country: "France" }
    ]
  }
  */
// Grouping first by country, then by city
groupBy(data, ["country", "city", "name"]);
/*
  {
    "USA": {
      "New York": [
        { name: "Alice", age: 25, city: "New York", country: "USA" },
        { name: "David", age: 35, city: "New York", country: "USA" }
      ],
      "Los Angeles": [
        { name: "Bob", age: 30, city: "Los Angeles", country: "USA" }
      ]
    },
    "UK": {
      "London": [
        { name: "Charlie", age: 25, city: "London", country: "UK" }
      ]
    },
    "France": {
      "Paris": [
        { name: "Eve", age: 35, city: "Paris", country: "France" }
      ]
    }
  }
  */
// Grouping by a function that groups by age range
// groupBy(data, function (person) {
//   return person.age >= 30 ? "30 and above" : "Below 30";
// });
/*
  {
    "Below 30": [
      { name: "Alice", age: 25, city: "New York", country: "USA" },
      { name: "Charlie", age: 25, city: "London", country: "UK" }
    ],
    "30 and above": [
      { name: "Bob", age: 30, city: "Los Angeles", country: "USA" },
      { name: "David", age: 35, city: "New York", country: "USA" },
      { name: "Eve", age: 35, city: "Paris", country: "France" }
    ]
  }
  */
