/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

export const prefixDate = (date: number) => (date >= 10 ? date : `0${date}`);
