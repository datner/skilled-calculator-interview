# Yuval Datner -- Fullstack Developer and React Specialist

very (VERY) simple implementation of a calculator.
technically PEMDAS, but I wouldn't try to stress test it.

In effort to make the implementation as simple as possible I decided to use 2 unrecommended functions, `eval` to parse JS-safe expressions.. like simple math. and a very very old but globally available `isNaN`.

I also relied on the text content of the button. Which is unsafe since it's easily subject to user change.

Both are things to avoid in real life environments but they are good enough for a tech demo.

My technique was to build an equation as a string, and parse it as JS. That way it can support a bit more complex computations like `1 + 2 + 3 * 4 \ 5 =`. There is technically a methodologically simpler method that just records 2 numbers and an operand, but it can't support PEMDAS
