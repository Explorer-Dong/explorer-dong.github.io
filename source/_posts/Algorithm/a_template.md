---
title: a_template
categories: Algorithm
category_bar: true
---

# template

## 高精度

```cpp
class Int : public std::vector<int> {
public:
	Int(int n = 0) {
		push_back(n);
		check();
	}

	Int& check() {
		for (int i = 1; i < size(); ++i) {
			(*this)[i] += (*this)[i - 1] / 10;
			(*this)[i - 1] %= 10;
		}
		while (back() >= 10) {
			push_back(back() / 10);
			(*this)[size() - 2] %= 10;
		}
		return *this;
	}

	friend std::istream& operator>>(std::istream& in, Int& n) {
		std::string s;
		in >> s;
		n.clear();
		for (int i = s.size() - 1; i >= 0; --i) n.push_back(s[i] - '0');
		return in;
	}

	friend std::ostream& operator<<(std::ostream& out, const Int& n) {
		if (n.empty()) out << 0;
		for (int i = n.size() - 1; i >= 0; --i) out << n[i];
		return out;
	}

	friend Int& operator+=(Int& a, const Int& b) {
		if (a.size() < b.size()) a.resize(b.size());
		for (int i = 0; i != b.size(); ++i) a[i] += b[i];
		return a.check();
	}

	friend Int operator+(Int a, const Int& b) {
		return a += b;
	}
};
```

## dsu

```cpp
struct dsu {
	int n;
	std::vector<int> p;
	dsu(int _n) { n = _n; p.resize(n + 1); for (int i = 1; i <= n; i++) p[i] = i; }
	int find(int x) { return (p[x] == x ? p[x] : p[x] = find(p[x])); }
	void merge(int a, int b) { p[find(a)] = find(b); }
	bool query(int a, int b) { return find(a) == find(b); }
	int block() { std::set<int> a; for (int i = 1; i <= n; i++) a.insert(find(p[i])); return a.size(); }
};
```