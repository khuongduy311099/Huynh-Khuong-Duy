var handleError = function (n) {
    if (!n && n !== 0) {
        throw new Error("Please provide number");
    }
};

var sum_to_n_a = function (n) {
    handleError(n);
    let sum = 0;
    for (i = 0; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sum_to_n_b = function (n) {
    handleError(n);
    let sum = 0;
    for (i = n; i >= 0; i--) {
        sum += i;
    }
    return sum;
};

var sum_to_n_c = function (n) {
    handleError(n);
    if (n <= 1 && n >= 0) {
        return n;
    } else {
        return n + sum_to_n_c(n - 1);
    }
};


