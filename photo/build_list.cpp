#include <iostream>
#include <cstdio>
using namespace std;

string tostring(int n) {
	if (n==0) return "0";
	string tmp;
	while (n) {
		tmp =  char(n % 10 + 48) + tmp;
		n /= 10;
	}
	return tmp;
}

char reads[1000];

int main() {
    int n; cin >> n;
    FILE *out = fopen("list.js", "w");
    fprintf(out, "var dataStr = [];\n");
    for (int i = 1; i <= n; i++) {
        fprintf(out, "\ndataStr.push(\"\\\n");
        string filein = "s" + tostring(i) + ".txt";
        FILE *in = fopen(filein.c_str(), "r");
        while (fscanf(in, " %[^\n]", reads) != EOF){
            string tmp(reads);
            fprintf(out, "%s<br>\\\n", tmp.c_str());
        }
        fclose(in);
        fprintf(out, "\");\n");
    }
    fclose(out);
}
