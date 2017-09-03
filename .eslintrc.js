module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": true
  },
  "rules": {
    "no-mixed-operators": "off",
    "no-continue": "off",
    "no-plusplus": "off",
    "no-bitwise": "off",
    "no-param-reassign": "off",
    "no-restricted-properties": [2, {
        "object": "Array",
        "property": "find"
    }]
  }
};
