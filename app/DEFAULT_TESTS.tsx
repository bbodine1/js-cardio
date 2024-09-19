'use client'

export const DEFAULT_TESTS = {
	beginner: [
		{
			id: '1725236503587',
			name: 'Reverse a String',
			code: "// CHALLENGE 1: REVERSE A STRING\n// Return a string in reverse\n// ex. reverseString('hello') === 'olleh'\n\nfunction reverseString(str) {\n  return 'Let\\'s Start'\n}",
			assertions:
				"assert(reverseString('hello') === 'olleh', \"reverseString('hello') should return 'olleh'\");\nassert(reverseString('javascript') === 'tpircsavaj', \"reverseString('javascript') should return 'tpircsavaj'\");\nassert(reverseString('12345') === '54321', \"reverseString('12345') should return '54321'\");\nassert(reverseString('') === '', \"reverseString('') should return ''\");\nassert(reverseString('a') === 'a', \"reverseString('a') should return 'a'\");\n",
		},
		{
			id: '1725236503589',
			name: 'Validate a Palindrome',
			code: "// CHALLENGE 2: VALIDATE A PALINDROME\n// Return true if palindrome and false if not\n// ex. isPalindrome('racecar') === 'true',\n// ex. isPalindrome('hello') == false\n\nfunction isPalindrome(str) {}",
			assertions:
				"assert(isPalindrome('racecar') === true, \"isPalindrome('racecar') should return true\");\nassert(isPalindrome('hello') === false, \"isPalindrome('hello') should return false\");\nassert(isPalindrome('A man, a plan, a canal: Panama') === true, \"isPalindrome('A man, a plan, a canal: Panama') should return true\");\nassert(isPalindrome('race a car') === false, \"isPalindrome('race a car') should return false\");\nassert(isPalindrome('') === true, \"isPalindrome('') should return true\");\n",
		},
	],
	intermediate: [
		{
			id: '1725236503590',
			name: 'Reverse an Integer',
			code: '// CHALLENGE 3: REVERSE AN INTEGER\n// Return an integer in reverse\n// ex. reverseInt(521) === 125\n\nfunction reverseInt(int) {}',
			assertions:
				'assert(reverseInt(521) === 125, "reverseInt(521) should return 125");\nassert(reverseInt(-123) === -321, "reverseInt(-123) should return -321");\nassert(reverseInt(120) === 21, "reverseInt(120) should return 21");\nassert(reverseInt(0) === 0, "reverseInt(0) should return 0");\nassert(reverseInt(1534236469) === 9646324351, "reverseInt(1534236469) should return 9646324351");\n',
		},
		{
			id: '1725236503591',
			name: 'Capitalize Letters',
			code: "// CHALLENGE 4: CAPITALIZE LETTERS\n// Return a string with the first letter\n// of every word capitalized\n// ex. capitalizeLetters('i love javascript') === 'I Love Javascript'\n\nfunction capitalizeLetters(str) {}",
			assertions:
				"assert(capitalizeLetters('i love javascript') === 'I Love Javascript', \"capitalizeLetters('i love javascript') should return 'I Love Javascript'\");\nassert(capitalizeLetters('hello world') === 'Hello World', \"capitalizeLetters('hello world') should return 'Hello World'\");\nassert(capitalizeLetters('') === '', \"capitalizeLetters('') should return ''\");\nassert(capitalizeLetters('a b c d') === 'A B C D', \"capitalizeLetters('a b c d') should return 'A B C D'\");\nassert(capitalizeLetters('follow THE yellow BRICK road') === 'Follow The Yellow Brick Road', \"capitalizeLetters('follow THE yellow BRICK road') should return 'Follow The Yellow Brick Road'\");\n",
		},
	],
	advanced: [
		{
			id: '1725236503592',
			name: 'Max Character',
			code: "// CHALLENGE 5: MAX CHARACTER\n// Return the character that is most common in a string\n// ex. maxCharacter('javascript') == 'a'\n\nfunction maxCharacter(str) {}",
			assertions:
				"assert(maxCharacter('javascript') === 'a', \"maxCharacter('javascript') should return 'a'\");\nassert(maxCharacter('hello') === 'l', \"maxCharacter('hello') should return 'l'\");\nassert(maxCharacter('1111222233') === '1', \"maxCharacter('1111222233') should return '1'\");\nassert(maxCharacter('') === '', \"maxCharacter('') should return ''\");\nassert(maxCharacter('aabbbcccc') === 'c', \"maxCharacter('aabbbcccc') should return 'c'\");\n",
		},
		{
			id: '1725236503593',
			name: 'FizzBuzz',
			code: '// CHALLENGE 6: FIZZBUZZ\n// Write a program that logs all the numbers\n// from 1 to 100.\n// For multiples of 3, instead of the number,\n// log "Fizz", for multiples of 5 log "Buzz".\n// For numbers which are multiples of both 3 and 5,\n// log "FizzBuzz".\n// (use console.log in the function)\n\nfunction fizzBuzz() {}',
			assertions:
				"// Note: FizzBuzz doesn't return a value, it prints to console. We'll test the first few numbers.\nlet output = [];\nconsole.log = (msg) => { output.push(msg); };\nfizzBuzz();\nassert(output[0] === 1, \"First output should be 1\");\nassert(output[1] === 2, \"Second output should be 2\");\nassert(output[2] === 'Fizz', \"Third output should be 'Fizz'\");\nassert(output[4] === 'Buzz', \"Fifth output should be 'Buzz'\");\nassert(output[14] === 'FizzBuzz', \"15th output should be 'FizzBuzz'\");\n",
		},
	],
}
