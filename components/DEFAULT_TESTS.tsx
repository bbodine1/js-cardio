'use client'
export const DEFAULT_TESTS = [
	{
		id: '1725236503587',
		name: 'Sum',
		code: 'function sum(a,b) {\n  // Write a function to add 2 numbers\n\n}',
		assertions:
			'assert(sum(1, 2) === 3, "sum of 1 + 2 should equal 3");\nassert(sum(2, 3) === 5, "sum of 2 + 3 should equal 5");\nassert(sum(0, 0) === 0, "sum of 0 + 0 should equal 0");\nassert(sum(-1, -1) === -2, "sum of -1 + -1 should equal -2");\nassert(sum(100, 200) === 300, "sum of 100 + 200 should equal 300");\nassert(sum(3, 7) === 10, "sum of 3 + 7 should equal 10");\nassert(sum(-5, 5) === 0, "sum of -5 + 5 should equal 0");\nassert(sum(-10, 15) === 5, "sum of -10 + 15 should equal 5");\nassert(sum(0.1, 0.2) === 0.3, "sum of 0.1 + 0.2 should equal 0.3");\nassert(sum(999, 1) === 1000, "sum of 999 + 1 should equal 1000");\n',
	},
	{
		id: '1725236503588',
		name: 'Reverse String',
		code: "function reverseString(str) {\n  return str.split('').reverse().join('');\n}",
		assertions:
			"assert(reverseString('hello') === 'olleh', \"reverseString('hello') should return 'olleh'\");\nassert(reverseString('JavaScript') === 'tpircSavaJ', \"reverseString('JavaScript') should return 'tpircSavaJ'\");\nassert(reverseString('12345') === '54321', \"reverseString('12345') should return '54321'\");\nassert(reverseString('') === '', \"reverseString('') should return ''\");\nassert(reverseString('a') === 'a', \"reverseString('a') should return 'a'\");\n",
	},
	{
		id: '1725236503589',
		name: 'Is Palindrome',
		code: "function isPalindrome(str) {\n  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return cleanStr === cleanStr.split('').reverse().join('');\n}",
		assertions:
			"assert(isPalindrome('racecar') === true, \"isPalindrome('racecar') should return true\");\nassert(isPalindrome('hello') === false, \"isPalindrome('hello') should return false\");\nassert(isPalindrome('A man, a plan, a canal: Panama') === true, \"isPalindrome('A man, a plan, a canal: Panama') should return true\");\nassert(isPalindrome('race a car') === false, \"isPalindrome('race a car') should return false\");\nassert(isPalindrome('') === true, \"isPalindrome('') should return true\");\n",
	},
	{
		id: '1725236503590',
		name: 'Reverse Integer',
		code: "function reverseInt(int) {\n  const reversed = parseInt(Math.abs(int).toString().split('').reverse().join(''));\n  return int < 0 ? -reversed : reversed;\n}",
		assertions:
			'assert(reverseInt(521) === 125, "reverseInt(521) should return 125");\nassert(reverseInt(-123) === -321, "reverseInt(-123) should return -321");\nassert(reverseInt(120) === 21, "reverseInt(120) should return 21");\nassert(reverseInt(0) === 0, "reverseInt(0) should return 0");\nassert(reverseInt(1534236469) === 9646324351, "reverseInt(1534236469) should return 9646324351");\n',
	},
	{
		id: '1725236503591',
		name: 'Capitalize Letters',
		code: "function capitalizeLetters(str) {\n  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');\n}",
		assertions:
			"assert(capitalizeLetters('i love javascript') === 'I Love Javascript', \"capitalizeLetters('i love javascript') should return 'I Love Javascript'\");\nassert(capitalizeLetters('hello world') === 'Hello World', \"capitalizeLetters('hello world') should return 'Hello World'\");\nassert(capitalizeLetters('') === '', \"capitalizeLetters('') should return ''\");\nassert(capitalizeLetters('a b c d') === 'A B C D', \"capitalizeLetters('a b c d') should return 'A B C D'\");\nassert(capitalizeLetters('follow THE yellow BRICK road') === 'Follow The Yellow Brick Road', \"capitalizeLetters('follow THE yellow BRICK road') should return 'Follow The Yellow Brick Road'\");\n",
	},
	{
		id: '1725236503592',
		name: 'Max Character',
		code: "function maxCharacter(str) {\n  const charMap = {};\n  let maxChar = '';\n  let maxCount = 0;\n  \n  for (let char of str) {\n    charMap[char] = (charMap[char] || 0) + 1;\n    if (charMap[char] > maxCount) {\n      maxChar = char;\n      maxCount = charMap[char];\n    }\n  }\n  \n  return maxChar;\n}",
		assertions:
			"assert(maxCharacter('javascript') === 'a', \"maxCharacter('javascript') should return 'a'\");\nassert(maxCharacter('hello') === 'l', \"maxCharacter('hello') should return 'l'\");\nassert(maxCharacter('1111222233') === '1', \"maxCharacter('1111222233') should return '1'\");\nassert(maxCharacter('') === '', \"maxCharacter('') should return ''\");\nassert(maxCharacter('aabbbcccc') === 'c', \"maxCharacter('aabbbcccc') should return 'c'\");\n",
	},
	{
		id: '1725236503593',
		name: 'FizzBuzz',
		code: "function fizzBuzz() {\n  for (let i = 1; i <= 100; i++) {\n    if (i % 3 === 0 && i % 5 === 0) {\n      console.log('FizzBuzz');\n    } else if (i % 3 === 0) {\n      console.log('Fizz');\n    } else if (i % 5 === 0) {\n      console.log('Buzz');\n    } else {\n      console.log(i);\n    }\n  }\n}",
		assertions:
			"// Note: FizzBuzz doesn't return a value, it prints to console. We'll test the first few numbers.\nlet output = [];\nconsole.log = (msg) => { output.push(msg); };\nfizzBuzz();\nassert(output[0] === 1, \"First output should be 1\");\nassert(output[1] === 2, \"Second output should be 2\");\nassert(output[2] === 'Fizz', \"Third output should be 'Fizz'\");\nassert(output[4] === 'Buzz', \"Fifth output should be 'Buzz'\");\nassert(output[14] === 'FizzBuzz', \"15th output should be 'FizzBuzz'\");\n",
	},
]
