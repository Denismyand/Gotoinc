const data = [
  { name: "Alice", age: 25, city: "New York", country: "USA" },
  { name: "Bob", age: 30, city: "Los Angeles", country: "USA" },
  { name: "Charlie", age: 25, city: "London", country: "UK" },
  { name: "David", age: 35, city: "New York", country: "USA" },
  { name: "Eve", age: 35, city: "Paris", country: "France" },
];

type GroupByKey<T> = keyof T | ((item: T) => string | number | undefined);
type GroupByKeys<T> = GroupByKey<T> | GroupByKey<T>[];
type FilterFunction<T> = (item: T) => boolean;

function groupBy<T>(
  items: T[],
  keys: GroupByKeys<T>,
  filterFn: FilterFunction<T> = () => true
): Record<string, any> {
  const groupingKeys = Array.isArray(keys) ? keys : [keys];

  const groupItems = (data: T[], level: number): Record<string, any> => {
    const keyOrFn = groupingKeys[level];
    const grouped: Record<string, any> = {};

    for (const item of data) {
      const key = typeof keyOrFn === "function" ? keyOrFn(item) : item[keyOrFn];
      const groupKey = key === undefined ? "undefined" : String(key);

      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(item);
      console.log(grouped, groupKey);
    }

    if (level < groupingKeys.length - 1) {
      for (const group in grouped) {
        grouped[group] = groupItems(grouped[group], level + 1);
      }
    }

    return grouped;
  };

  const filteredItems = items.filter(filterFn);
  return groupItems(filteredItems, 0);
}

// Grouping by country
groupBy(data, "country");

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
groupBy(data, ["country", "city"]);

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
groupBy(data, (person) => (person.age >= 30 ? "30 and above" : "Below 30"));

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
