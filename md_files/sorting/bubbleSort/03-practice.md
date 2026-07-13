---
title: Practice: Bubble Sort
order: 3
type: practice
---

# Practice Problem: Sort By Last Name

You are given an array of strings representing full names (e.g., "John Doe"). Use Bubble Sort to sort these names alphabetically by their *last name*.

**Example Input:**
`["Alan Turing", "Grace Hopper", "Ada Lovelace", "Charles Babbage"]`

**Expected Output:**
`["Charles Babbage", "John Doe", "Grace Hopper", "Ada Lovelace", "Alan Turing"]` 
*(Wait, Babbage, Doe, Hopper, Lovelace, Turing)*

<details>
<summary>View Solution</summary>

```python
def sort_by_last_name(names):
    n = len(names)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            last_name1 = names[j].split(" ")[-1]
            last_name2 = names[j+1].split(" ")[-1]
            
            if last_name1 > last_name2:
                names[j], names[j+1] = names[j+1], names[j]
                swapped = True
        
        if not swapped:
            break
    return names
```

```javascript
function sortByLastName(names) {
    let n = names.length;
    for (let i = 0; i < n; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            let lastName1 = names[j].split(' ').pop();
            let lastName2 = names[j+1].split(' ').pop();
            
            if (lastName1 > lastName2) {
                let temp = names[j];
                names[j] = names[j+1];
                names[j+1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return names;
}
```
</details>
