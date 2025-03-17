**Documentation for `data_analysis.py`**

---
## Overview
`data_analysis.py` is a command-line utility designed to provide quick and straightforward data analysis on CSV files. It leverages **pandas** for data manipulation, **NumPy** for numerical computations, and **SciPy** for statistical functions.

This script supports four main operations:
1. **Calculating Basic Statistics (`stats`)**  
2. **Generating Text-Based Histograms (`histogram`)**  
3. **Finding the Correlation Between Two Columns (`correlation`)**  
4. **Detecting Outliers Based on Z-Score (`outliers`)**

---

## Requirements
- **Python 3.6+** (Recommended)  
- **pandas** (for reading and handling CSV data)  
- **NumPy** (for efficient numerical operations)  
- **SciPy** (for statistical functions like `zscore` and `mode`)

Install these via:
```bash
pip install pandas numpy scipy
```

---

## File Structure & Usage
- **Script Name:** `data_analysis.py`
- **Entry Point:** The `main()` function handles command-line arguments and executes the requested operation.

### Command-Line Invocation
```bash
python data_analysis.py <file> <command> <column> [options]
```
Where:
- `<file>` is the path to your CSV file (e.g., `sample_data.csv`).
- `<command>` is one of the following:
  - **stats**: Calculate mean, median, mode, and standard deviation for a given column.
  - **histogram**: Print a text-based histogram for a given column.
  - **correlation**: Compute the Pearson correlation coefficient between two columns.
  - **outliers**: Detect and print rows whose values for a specific column exceed a Z-score threshold.
- `<column>` is the column name to analyze (for `stats`, `histogram`, `outliers`) or the first column (for `correlation`).
- `[options]` are additional parameters depending on the chosen command.

---

## Commands & Examples

### 1. Stats
Calculate basic statistics (mean, median, mode, and standard deviation) for a given column.

**Usage:**
```bash
python data_analysis.py sample_data.csv stats <column_name>
```

**Example:**
```bash
python data_analysis.py sample_data.csv stats price
```
**Output:**  
Displays mean, median, mode, and standard deviation for the `price` column.

---

### 2. Histogram
Generate and print a simple text-based histogram of a given column.

**Usage:**
```bash
python data_analysis.py sample_data.csv histogram <column_name> <bins>
```
- `<bins>` (optional): Number of bins (integer). Defaults to 10 if not specified.

**Example:**
```bash
python data_analysis.py sample_data.csv histogram age 5
```
**Output:**  
Displays the frequency distribution of the `age` column across 5 bins.

---

### 3. Correlation
Compute and print the Pearson correlation coefficient between two columns.

**Usage:**
```bash
python data_analysis.py sample_data.csv correlation <column1> <column2>
```
**Example:**
```bash
python data_analysis.py sample_data.csv correlation height weight
```
**Output:**  
Displays the correlation (a value between `-1.0` and `1.0`) indicating how strongly `height` and `weight` are linearly related.

---

### 4. Outliers
Detect and print rows that have Z-scores exceeding a given threshold.

**Usage:**
```bash
python data_analysis.py sample_data.csv outliers <column_name> <threshold>
```
- `<threshold>` (optional): Z-score threshold. Defaults to `2.0` if not specified.

**Example:**
```bash
python data_analysis.py sample_data.csv outliers salary 2.5
```
**Output:**  
Displays rows from `sample_data.csv` where the `salary` column’s Z-score is greater than `2.5`.

---

## Code Structure

### Functions

1. **`load_data(file_path)`**  
   - **Purpose:** Reads data from a CSV file into a pandas DataFrame.  
   - **Parameters:**  
     - `file_path` *(str)* – path to the CSV file.  
   - **Returns:**  
     - A pandas DataFrame containing the CSV data.  
   - **Error Handling:**  
     - Prints an error message and exits if the file cannot be read.

2. **`calculate_stats(df, column)`**  
   - **Purpose:** Calculates and prints mean, median, mode, and standard deviation for a specified column.  
   - **Parameters:**  
     - `df` *(pd.DataFrame)* – the data.  
     - `column` *(str)* – the column name to analyze.

3. **`generate_text_histogram(df, column, bins=10)`**  
   - **Purpose:** Creates a simple text-based histogram for a specified column.  
   - **Parameters:**  
     - `df` *(pd.DataFrame)* – the data.  
     - `column` *(str)* – the column name to visualize.  
     - `bins` *(int)* – number of histogram bins (default: 10).

4. **`find_correlation(df, col1, col2)`**  
   - **Purpose:** Computes and prints the Pearson correlation coefficient between two columns.  
   - **Parameters:**  
     - `df` *(pd.DataFrame)* – the data.  
     - `col1` *(str)* – first column name.  
     - `col2` *(str)* – second column name.

5. **`detect_outliers(df, column, threshold=2.0)`**  
   - **Purpose:** Identifies and prints outliers in a given column using a Z-score threshold.  
   - **Parameters:**  
     - `df` *(pd.DataFrame)* – the data.  
     - `column` *(str)* – the column name to analyze.  
     - `threshold` *(float)* – Z-score cut-off (default: 2.0). Rows with Z-scores beyond this limit are considered outliers.

6. **`main()`**  
   - **Purpose:** Entry point that parses command-line arguments and invokes the appropriate function.  
   - **Behavior:**  
     - Exits early and shows usage instructions if arguments are insufficient.  
     - Executes a command (`stats`, `histogram`, `correlation`, or `outliers`) based on user input.  

### Demonstration Block (Optional)
At the bottom of the file, there is a demonstration that creates a small DataFrame in memory and directly calls each function to showcase its behavior. This block is wrapped in:
```python
if __name__ == "__main__":
    # demonstration code...
```
It allows you to see how the functions work without providing a CSV file via the command line.

---

## Example Workflow
1. **Create or place your `sample_data.csv`** in the same directory as `data_analysis.py`.
2. **Open a terminal** and navigate to that directory.
3. **Run** one of the commands, for example:
   ```bash
   python data_analysis.py sample_data.csv stats my_column
   ```
4. **Check** the resulting output in your terminal.

---

## Common Issues
- **FileNotFoundError**: Ensure the CSV filename and path are correct.  
- **Column Not Found**: Check spelling or confirm the column name exists in the CSV.  
- **Insufficient Arguments**: Always provide `<file> <command> <column>` and any necessary extras (e.g., `bins` or `threshold`).  
- **Dependencies**: Make sure **pandas**, **NumPy**, and **SciPy** are installed.

---

## License
(Include a license here if you want to distribute your code under a specific license, e.g., MIT, Apache 2.0, etc.)

---
