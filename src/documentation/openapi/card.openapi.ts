/**
 * @openapi
 * /api/card/validate:
 *   post:
 *     summary: Payment card data validation
 *     description: Validates the provided card number and expiration date
 *     tags:
 *       - Card Validation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - card_number
 *               - expiration_month
 *               - expiration_year
 *             properties:
 *               card_number:
 *                 type: string
 *                 description: Card number (e.g., "4111111111111111")
 *               expiration_month:
 *                 type: string
 *                 description: Expiration month (MM, e.g., "12")
 *               expiration_year:
 *                 type: string
 *                 description: Expiration year (YYYY, e.g., "2028")
 *           example:
 *             card_number: "4111111111111111"
 *             expiration_month: "12"
 *             expiration_year: "2028"
 *     responses:
 *       200:
 *         description: Successful validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 is_valid:
 *                   type: boolean
 *                   description: Indicates whether the card is valid
 *                 card_type:
 *                   type: string
 *                   description: Card type (e.g., "Visa", "MasterCard") - optional field
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         description: Field where the error was found
 *                       message:
 *                         type: string
 *                         description: Error message
 *             example:
 *               is_valid: true
 *               card_type: "Visa"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 is_valid:
 *                   type: boolean
 *                   description: Indicates whether the card is valid
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         description: Field where the error was found
 *                       message:
 *                         type: string
 *                         description: Error message
 *             example:
 *               is_valid: false
 *               errors:
 *                 - field: "card_number"
 *                   message: "Invalid card number"
 */
