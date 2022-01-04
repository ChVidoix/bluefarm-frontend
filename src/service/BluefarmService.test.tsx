import axios from "axios";
import {
  countCropsTypeArea,
  createCashEvent,
  createCrop,
  createEvent,
  createFertilizeEvent,
  createHarvest,
  createWeatherEvent,
  divideCashEvents,
  editCashEvent,
  editCrop,
  editEvent,
  editFertilizeEvent,
  editHarvest,
  editWeatherEvent,
  filterCashEvents,
  filterEvents,
  filterFertilizeEvents,
  filterHarvests,
  filterWeatherEvents,
  formatDate,
  formatHarvestsDuration,
  formatOnlyDate,
  getAllFertilizeEvents,
  getAllHarvests,
  getCashEvents,
  getCashEventsStats,
  getCashEventsYears,
  getCrops,
  getEvents,
  getFertilizationEvents,
  getFertilizeEventsYears,
  getHarvests,
  getHarvestsDuration,
  getHarvestsYears,
  getMostFruitfulHarvest,
  getNearestFertilizeEvent,
  getWeatherEvents,
  getWeatherEventsToRender,
  loadUser,
  loginUser,
  parseJSDateToDjango,
  registerUser,
  sortEvents,
} from "./BlueFarmService";
import {
  CashEventModel,
  CropModel,
  EventModel,
  FertilizeEventModel,
  HarvestModel,
  WeatherEventModel,
} from "./BlueFarm.service.const";

jest.mock("axios");

describe("Bluefarm service tests", () => {
  test("should load user", async () => {
    const data = {
      id: 1,
      username: "user",
      email: "email",
    };
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await loadUser("token");
    expect(response).toEqual(data);
  });

  test("should login user", async () => {
    const data = {
      user: {
        id: 1,
        username: "user",
        email: "email",
      },
      token: "token",
    };
    // @ts-ignore
    axios.post.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await loginUser({
      username: "user",
      password: "password",
    });
    expect(response).toEqual(data);
  });

  test("should register user", async () => {
    const data = {
      user: {
        id: 1,
        username: "user",
        email: "email",
      },
      token: "token",
    };
    // @ts-ignore
    axios.post.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await registerUser({
      username: "user",
      password: "password",
      email: "email",
    });
    expect(response).toEqual(data);
  });

  test("should get crop", async () => {
    const data = [
      {
        id: 1,
        name: "name",
        description: "description",
        type: "type",
        variety: "variety",
        area: 123,
        farmer: 1,
      },
    ];
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await getCrops("token");
    expect(response).toEqual(data);
  });

  test("should create crop", async () => {
    const data = {
      id: 1,
      name: "name",
      description: "description",
      type: "type",
      variety: "variety",
      area: 123,
      farmer: 1,
    };
    // @ts-ignore
    axios.post.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await createCrop({
      token: "token",
      area: 123,
      type: "type",
      variety: "variety",
      name: "name",
      description: "description",
    });
    expect(response).toEqual(data);
  });

  test("should edit crop", async () => {
    const data = {
      id: 1,
      name: "name",
      description: "description",
      type: "type",
      variety: "variety",
      area: 123,
      farmer: 1,
    };
    // @ts-ignore
    axios.put.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await editCrop({
      token: "token",
      id: 1,
      area: 123,
      type: "type",
      variety: "variety",
      name: "name",
      description: "description",
    });
    expect(response).toEqual(data);
  });

  test("should count crops area by type", () => {
    const crops: Array<CropModel> = [
      {
        id: 1,
        name: "name",
        description: "description",
        type: "type",
        variety: "variety",
        area: 123,
        farmer: 1,
      },
      {
        id: 2,
        name: "name",
        description: "description",
        type: "type",
        variety: "variety",
        area: 123,
        farmer: 1,
      },
      {
        id: 3,
        name: "name",
        description: "description",
        type: "type2",
        variety: "variety",
        area: 123,
        farmer: 1,
      },
    ];

    const result = countCropsTypeArea(crops);
    const expectedResult = {
      type: 246,
      type2: 123,
    };
    expect(result).toEqual(expectedResult);
  });

  test("should get events", async () => {
    const data: Array<EventModel> = [
      {
        id: 1,
        name: "name",
        description: "description",
        start_date: "start",
        end_date: "end",
        farmer: 1,
      },
    ];
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await getEvents("token");
    expect(response).toEqual(data);
  });

  test("should create event", async () => {
    const data = {
      id: 1,
      name: "name",
      description: "description",
      start_date: "start",
      end_date: "end",
      farmer: 1,
    };
    // @ts-ignore
    axios.post.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await createEvent({
      token: "token",
      name: "name",
      description: "description",
      start_date: "start",
      end_date: "end",
    });
    expect(response).toEqual(data);
  });

  test("should edit event", async () => {
    const data = {
      id: 1,
      name: "name",
      description: "description",
      start_date: "start",
      end_date: "end",
      farmer: 1,
    };
    // @ts-ignore
    axios.put.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await editEvent({
      token: "token",
      id: 1,
      name: "name",
      description: "description",
      start_date: "start",
      end_date: "end",
    });
    expect(response).toEqual(data);
  });

  test("should get cash events", async () => {
    const data: Array<CashEventModel> = [
      {
        id: 1,
        name: "name",
        description: "description",
        date: "start",
        amount: 123,
      },
    ];
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await getCashEvents("token");
    expect(response).toEqual(data);
  });

  test("should create cash event", async () => {
    const data = {
      id: 1,
      name: "name",
      description: "description",
      date: "start",
      amount: 123,
      farmer: 1,
    };
    // @ts-ignore
    axios.post.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await createCashEvent({
      token: "token",
      name: "name",
      description: "description",
      date: "start",
      amount: 123,
    });
    expect(response).toEqual(data);
  });

  test("should edit cash event", async () => {
    const data = {
      id: 1,
      name: "name",
      description: "description",
      date: "start",
      amount: 123,
      farmer: 1,
    };
    // @ts-ignore
    axios.put.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await editCashEvent({
      token: "token",
      id: 1,
      name: "name",
      description: "description",
      date: "start",
      amount: 123,
    });
    expect(response).toEqual(data);
  });

  test("should parse JS date do format required by django", () => {
    const date = "12-12-2012";
    const time = "12:12";
    const result = parseJSDateToDjango(date, time);
    expect(result.slice(0, 10)).toEqual(date);
    expect(result.slice(11, 16)).toEqual(time);
    expect(result.slice(-1)).toEqual("Z");
  });

  test("should filter events", () => {
    const events = [
      {
        id: 1,
        name: "wydarzenie 1",
        description: "opis wydarzenia 1",
        start_date: "2021-12-19T12:00:00Z",
        end_date: "2021-12-19T13:00:00Z",
        farmer: 2,
      },
      {
        id: 2,
        name: "wydarzenie 2",
        description: "przykladowy opis",
        start_date: "2021-12-23T12:00:00Z",
        end_date: "2021-12-24T13:00:00Z",
        farmer: 2,
      },
    ];
    const startTimestamp = 1639785600000; //2021-12-18 12:00
    const endTimestamp = 1639958400000; //2021-12-20 12:00

    const result = filterEvents({ events, startTimestamp, endTimestamp });
    const expectedResult = [
      {
        id: 1,
        name: "wydarzenie 1",
        description: "opis wydarzenia 1",
        start_date: "2021-12-19T12:00:00Z",
        end_date: "2021-12-19T13:00:00Z",
        farmer: 2,
      },
    ];
    expect(result).toEqual(expectedResult);
  });

  test("should divide cash events into incomes and outgoings", () => {
    const cashEvents = [
      {
        id: 1,
        name: "name1",
        description: "description1",
        date: "start",
        amount: 12,
      },
      {
        id: 2,
        name: "name2",
        description: "description2",
        date: "start",
        amount: -123,
      },
      {
        id: 3,
        name: "name3",
        description: "description3",
        date: "start",
        amount: 1234,
      },
    ];

    const expectedIncomes = [
      {
        id: 1,
        name: "name1",
        description: "description1",
        date: "start",
        amount: 12,
      },
      {
        id: 3,
        name: "name3",
        description: "description3",
        date: "start",
        amount: 1234,
      },
    ];
    const expectedOutgoings = [
      {
        id: 2,
        name: "name2",
        description: "description2",
        date: "start",
        amount: -123,
      },
    ];
    const result = divideCashEvents(cashEvents);
    expect(result.filteredIncomes).toEqual(expectedIncomes);
    expect(result.filteredOutgoings).toEqual(expectedOutgoings);
  });

  test("should get cash events stats", () => {
    const cashEvents = [
      {
        id: 1,
        name: "name1",
        description: "description1",
        date: "start",
        amount: 12,
      },
      {
        id: 2,
        name: "name2",
        description: "description2",
        date: "start",
        amount: -123,
      },
      {
        id: 3,
        name: "name3",
        description: "description3",
        date: "start",
        amount: 1234,
      },
    ];

    const result = getCashEventsStats(divideCashEvents(cashEvents));
    expect(result.detailed.incomes).toEqual(1246);
    expect(result.detailed.outgoings).toEqual(-123);
    expect(result.balance).toEqual(1123);
  });

  test("should filter cash events", () => {
    const events = [
      {
        id: 1,
        name: "outgoing 1",
        description: "description 1",
        date: "2021-12-18T12:00:00Z",
        amount: -100,
        farmer: 2,
      },
      {
        id: 2,
        name: "outgoing 2",
        description: "description 2",
        date: "2021-12-20T12:00:00Z",
        amount: -200,
        farmer: 2,
      },
      {
        id: 3,
        name: "income 1",
        description: "description 1",
        date: "2021-12-22T12:00:00Z",
        amount: 300,
        farmer: 2,
      },
      {
        id: 4,
        name: "income 2",
        description: "description 2",
        date: "2021-12-16T12:00:00Z",
        amount: 150,
        farmer: 2,
      },
    ];

    const startTimestamp = 1639699200000;
    const endTimestamp = 1640044800000;
    const minAmount = -400;
    const maxAmount = -50;

    const expectedResult = [
      {
        id: 1,
        name: "outgoing 1",
        description: "description 1",
        date: "2021-12-18T12:00:00Z",
        amount: -100,
        farmer: 2,
      },
      {
        id: 2,
        name: "outgoing 2",
        description: "description 2",
        date: "2021-12-20T12:00:00Z",
        amount: -200,
        farmer: 2,
      },
    ];

    const result = filterCashEvents({
      events,
      maxAmount,
      minAmount,
      startTimestamp,
      endTimestamp,
    });

    expect(result).toEqual(expectedResult);
  });

  test("should get cash events years", () => {
    const events = [
      {
        id: 1,
        name: "outgoing 1",
        description: "description 1",
        date: "2021-12-18T12:00:00Z",
        amount: -100,
        farmer: 2,
      },
      {
        id: 2,
        name: "outgoing 2",
        description: "description 2",
        date: "2022-12-20T12:00:00Z",
        amount: -200,
        farmer: 2,
      },
    ];

    const expectedResult = ["2021", "2022"];
    const result = getCashEventsYears(events);

    expect(result).toEqual(expectedResult);
  });

  test("should get fertilize events years", () => {
    const events: Array<FertilizeEventModel> = [
      {
        id: 1,
        name: "outgoing 1",
        type: "type",
        description: "description 1",
        date: "2021-12-18T12:00:00Z",
        amount: -100,
        crop: 1,
      },
      {
        id: 2,
        name: "outgoing 2",
        type: "type",
        description: "description 2",
        date: "2022-12-20T12:00:00Z",
        amount: -200,
        crop: 1,
      },
    ];

    const expectedResult = ["2021", "2022"];
    const result = getFertilizeEventsYears(events);

    expect(result).toEqual(expectedResult);
  });

  test("should get harvests years", () => {
    const events: Array<HarvestModel> = [
      {
        id: 1,
        name: "outgoing 1",
        notes: "notes",
        start_date: "2021-12-18T12:00:00Z",
        end_date: "2021-12-18T12:00:00Z",
        crop_amount: -100,
        crop: 1,
      },
      {
        id: 2,
        name: "outgoing 2",
        notes: "description 2",
        start_date: "2022-12-20T12:00:00Z",
        end_date: "2022-12-20T12:00:00Z",
        crop_amount: -200,
        crop: 1,
      },
    ];

    const expectedResult = ["2021", "2022"];
    const result = getHarvestsYears(events);

    expect(result).toEqual(expectedResult);
  });

  test("should get harvests", async () => {
    const data: Array<HarvestModel> = [
      {
        id: 1,
        name: "outgoing 1",
        notes: "notes",
        start_date: "2021-12-18T12:00:00Z",
        end_date: "2021-12-18T12:00:00Z",
        crop_amount: -100,
        crop: 1,
      },
      {
        id: 2,
        name: "outgoing 2",
        notes: "description 2",
        start_date: "2022-12-20T12:00:00Z",
        end_date: "2022-12-20T12:00:00Z",
        crop_amount: -200,
        crop: 1,
      },
    ];
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await getHarvests("token", 1);
    expect(response).toEqual(data);
  });

  test("should get all harvests", async () => {
    const data: Array<HarvestModel> = [
      {
        id: 1,
        name: "outgoing 1",
        notes: "notes",
        start_date: "2021-12-18T12:00:00Z",
        end_date: "2021-12-18T12:00:00Z",
        crop_amount: -100,
        crop: 123,
      },
      {
        id: 2,
        name: "outgoing 2",
        notes: "description 2",
        start_date: "2022-12-20T12:00:00Z",
        end_date: "2022-12-20T12:00:00Z",
        crop_amount: -200,
        crop: 123,
      },
    ];
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await getAllHarvests("token");
    expect(response).toEqual(data);
  });

  test("should create harvest", async () => {
    const data: HarvestModel = {
      id: 1,
      name: "outgoing 1",
      notes: "notes",
      start_date: "2021-12-18T12:00:00Z",
      end_date: "2021-12-18T12:00:00Z",
      crop_amount: -100,
      crop: 1,
    };
    // @ts-ignore
    axios.post.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await createHarvest({
      token: "token",
      cropId: 1,
      name: "outgoing 1",
      notes: "notes",
      start_date: "2021-12-18T12:00:00Z",
      end_date: "2021-12-18T12:00:00Z",
      crop_amount: -100,
    });
    expect(response).toEqual(data);
  });

  test("should edit harvest", async () => {
    const data = {
      id: 1,
      name: "outgoing 1",
      notes: "notes",
      start_date: "2021-12-18T12:00:00Z",
      end_date: "2021-12-18T12:00:00Z",
      crop_amount: -100,
      crop: 1,
    };
    // @ts-ignore
    axios.put.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await editHarvest({
      token: "token",
      cropId: 1,
      harvestId: 1,
      name: "name",
      notes: "description",
      start_date: "start",
      end_date: "start",
      crop_amount: 123,
    });
    expect(response).toEqual(data);
  });

  test("should get all fertilize events", async () => {
    const data: Array<FertilizeEventModel> = [
      {
        id: 1,
        name: "fertilize 1",
        type: "type",
        date: "2021-12-18T12:00:00Z",
        description: "description",
        amount: -100,
        crop: 1,
      },
      {
        id: 1,
        name: "fertilize 2",
        type: "type",
        date: "2021-12-18T12:00:00Z",
        description: "description2",
        amount: -100,
        crop: 1,
      },
    ];
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await getAllFertilizeEvents("token");
    expect(response).toEqual(data);
  });

  test("should get fertilize events", async () => {
    const data: Array<FertilizeEventModel> = [
      {
        id: 1,
        name: "fertilize 1",
        type: "type",
        date: "2021-12-18T12:00:00Z",
        description: "description",
        amount: -100,
        crop: 123,
      },
      {
        id: 1,
        name: "fertilize 2",
        type: "type",
        date: "2021-12-18T12:00:00Z",
        description: "description2",
        amount: -100,
        crop: 123,
      },
    ];
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await getFertilizationEvents("token", 1);
    expect(response).toEqual(data);
  });

  test("should create fertilize event", async () => {
    const data: FertilizeEventModel = {
      id: 1,
      name: "fertilize 2",
      type: "type",
      date: "2021-12-18T12:00:00Z",
      description: "description2",
      amount: -100,
      crop: 1,
    };
    // @ts-ignore
    axios.post.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await createFertilizeEvent({
      token: "token",
      cropId: 1,
      name: "fertilize 2",
      type: "type",
      date: "2021-12-18T12:00:00Z",
      description: "description2",
      amount: -100,
    });
    expect(response).toEqual(data);
  });

  test("should edit fertilize events", async () => {
    const data: FertilizeEventModel = {
      id: 1,
      name: "fertilize 2",
      type: "type",
      date: "2021-12-18T12:00:00Z",
      description: "description2",
      amount: -100,
      crop: 1,
    };
    // @ts-ignore
    axios.put.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await editFertilizeEvent({
      token: "token",
      cropId: 1,
      fertilizeEventId: 1,
      name: "fertilize 2",
      type: "type",
      date: "2021-12-18T12:00:00Z",
      description: "description2",
      amount: -100,
    });
    expect(response).toEqual(data);
  });

  test("should filter fertilize events", () => {
    const events: Array<FertilizeEventModel> = [
      {
        id: 1,
        name: "fertilize 1",
        type: "type",
        date: "2021-12-19T12:00:00Z",
        description: "description",
        amount: -100,
        crop: 1,
      },
      {
        id: 1,
        name: "fertilize 2",
        type: "type",
        date: "2021-12-16T12:00:00Z",
        description: "description2",
        amount: -100,
        crop: 1,
      },
    ];

    const startTimestamp = 1639699200000; // 2021-12-17 12:00
    const endTimestamp = 1640044800000; //2021-12-21 12:00

    const expectedResult: Array<FertilizeEventModel> = [
      {
        id: 1,
        name: "fertilize 1",
        type: "type",
        date: "2021-12-19T12:00:00Z",
        description: "description",
        amount: -100,
        crop: 1,
      },
    ];

    const result = filterFertilizeEvents({
      events,
      startTimestamp,
      endTimestamp,
    });

    expect(result).toEqual(expectedResult);
  });

  test("should filter harvests", () => {
    const events: Array<HarvestModel> = [
      {
        id: 1,
        name: "harvest 1",
        notes: "notes",
        start_date: "2021-12-18T12:00:00Z",
        end_date: "2021-12-18T12:00:00Z",
        crop_amount: -100,
        crop: 123,
      },
      {
        id: 2,
        name: "harvest 2",
        notes: "description 2",
        start_date: "2022-12-20T12:00:00Z",
        end_date: "2022-12-16T12:00:00Z",
        crop_amount: -200,
        crop: 123,
      },
    ];
    const startTimestamp = 1639699200000; // 2021-12-17 12:00
    const endTimestamp = 1640044800000; //2021-12-21 12:00

    const expectedResult: Array<HarvestModel> = [
      {
        id: 1,
        name: "harvest 1",
        notes: "notes",
        start_date: "2021-12-18T12:00:00Z",
        end_date: "2021-12-18T12:00:00Z",
        crop_amount: -100,
        crop: 123,
      },
    ];
    const result = filterHarvests({ events, startTimestamp, endTimestamp });
    expect(result).toEqual(expectedResult);
  });

  test("should format date", () => {
    const dateToFormat = "2021-12-18T12:00:00Z";
    const expectedResult = "12:00 18.12.2021";
    const result = formatDate(dateToFormat);
    expect(result).toEqual(expectedResult);
  });

  test("should format date without time", () => {
    const dateToFormat = "2021-12-18T12:00:00Z";
    const expectedResult = "18.12.2021";
    const result = formatOnlyDate(dateToFormat);
    expect(result).toEqual(expectedResult);
  });

  test("should get nearest fertilize event", () => {
    const events: Array<FertilizeEventModel> = [
      {
        id: 1,
        name: "fertilize 1",
        type: "type",
        description: "description 1",
        date: "2021-12-18T12:00:00Z",
        amount: -100,
        crop: 1,
      },
      {
        id: 1,
        name: "fertilize 2",
        type: "type",
        description: "description 1",
        date: "2021-12-20T12:00:00Z",
        amount: 300,
        crop: 1,
      },
      {
        id: 2,
        name: "fertilize 2",
        type: "type",
        description: "description 2",
        date: "2022-12-20T12:00:00Z",
        amount: -200,
        crop: 1,
      },
    ];

    const expectedResult: FertilizeEventModel = {
      id: 2,
      name: "fertilize 2",
      type: "type",
      description: "description 2",
      date: "2022-12-20T12:00:00Z",
      amount: -200,
      crop: 1,
    };

    const result = getNearestFertilizeEvent(events);
    expect(result).toEqual(expectedResult);
  });

  test("should format harvests duration", () => {
    const toFormat = "123 days 13 hours";
    const expectedResult = "123 dni 13 godzin";
    const result = formatHarvestsDuration(toFormat);
    expect(result).toEqual(expectedResult);
  });

  test("should get harvests duration", () => {
    const harvests: Array<HarvestModel> = [
      {
        id: 1,
        name: "outgoing 1",
        notes: "notes",
        start_date: "2021-12-18T12:00:00Z",
        end_date: "2021-12-18T12:00:00Z",
        crop_amount: -100,
        crop: 1,
      },
      {
        id: 2,
        name: "outgoing 2",
        notes: "description 2",
        start_date: "2021-12-20T12:00:00Z",
        end_date: "2021-12-20T12:00:00Z",
        crop_amount: -200,
        crop: 1,
      },
    ];

    const expectedResult = "2 days";
    const result = getHarvestsDuration(harvests);
    expect(result).toEqual(expectedResult);
  });

  test("should get most fruitful harvest", () => {
    const harvests: Array<HarvestModel> = [
      {
        id: 1,
        name: "harvest 1",
        notes: "notes",
        start_date: "2021-12-18T12:00:00Z",
        end_date: "2021-12-18T12:00:00Z",
        crop_amount: 200,
        crop: 1,
      },
      {
        id: 2,
        name: "harvest 2",
        notes: "description 2",
        start_date: "2022-12-20T12:00:00Z",
        end_date: "2022-12-20T12:00:00Z",
        crop_amount: 300,
        crop: 1,
      },
    ];

    const expectedResult: HarvestModel = {
      id: 2,
      name: "harvest 2",
      notes: "description 2",
      start_date: "2022-12-20T12:00:00Z",
      end_date: "2022-12-20T12:00:00Z",
      crop_amount: 300,
      crop: 1,
    };

    const result = getMostFruitfulHarvest(harvests);
    expect(result).toEqual(expectedResult);
  });

  test("should sort all events", () => {
    // this test may fail later because this function's result  depends on the current date
    const events: Array<any> = [
      {
        id: 2,
        name: "harvest 2",
        notes: "description 2",
        start_date: "2022-12-20T12:00:00Z",
        end_date: "2022-12-20T12:00:00Z",
        crop_amount: 300,
        crop: 1,
      },
      {
        id: 3,
        name: "outgoing 1",
        description: "description 1",
        date: "2021-12-30T12:00:00Z",
        amount: -100,
        farmer: 2,
      },
      {
        id: 1,
        name: "outgoing 2",
        description: "description 2",
        date: "2021-12-17T12:00:00Z",
        amount: -100,
        farmer: 2,
      },
    ];

    const expectedResult = [
      {
        id: 3,
        name: "outgoing 1",
        description: "description 1",
        date: "2021-12-30T12:00:00Z",
        amount: -100,
        farmer: 2,
      },
      {
        id: 2,
        name: "harvest 2",
        notes: "description 2",
        start_date: "2022-12-20T12:00:00Z",
        end_date: "2022-12-20T12:00:00Z",
        crop_amount: 300,
        crop: 1,
      },
    ];

    const result = sortEvents(events);
    expect(result).toEqual(expectedResult);
  });

  test("should get weather", async () => {
    const data: Array<WeatherEventModel> = [
      {
        id: 1,
        description: "description",
        date: "2021-12-19T12:00:00Z",
        max_temp: 21,
        min_temp: 20,
        rainfall: "rainfall",
      },
      {
        id: 2,
        description: "description",
        date: "2021-12-21T12:00:00Z",
        max_temp: 24,
        min_temp: 21,
        rainfall: "rainfall ",
      },
    ];
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await getWeatherEvents("token");
    expect(response).toEqual(data);
  });

  test("should create weather", async () => {
    const data: WeatherEventModel = {
      id: 2,
      description: "description",
      date: "2021-12-21T12:00:00Z",
      max_temp: 24,
      min_temp: 21,
      rainfall: "rainfall ",
    };
    // @ts-ignore
    axios.post.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await createWeatherEvent({
      token: "token",
      description: "description",
      date: "2021-12-21T12:00:00Z",
      max_temp: 24,
      min_temp: 21,
      rainfall: "rainfall ",
    });
    expect(response).toEqual(data);
  });

  test("should edit weather", async () => {
    const data = {
      id: 1,
      name: "name",
      description: "description",
      type: "type",
      variety: "variety",
      area: 123,
      farmer: 1,
    };
    // @ts-ignore
    axios.put.mockImplementationOnce(() => Promise.resolve({ data }));

    const response = await editWeatherEvent({
      token: "token",
      id: 1,
      description: "description",
      date: "2021-12-21T12:00:00Z",
      max_temp: 24,
      min_temp: 21,
      rainfall: "rainfall ",
    });
    expect(response).toEqual(data);
  });

  test("should get weather events to render", () => {
    const data: Array<WeatherEventModel> = [
      {
        id: 1,
        description: "description",
        date: "2021-12-16",
        max_temp: 21,
        min_temp: 20,
        rainfall: "rainfall",
      },
      {
        id: 2,
        description: "description",
        date: "2021-12-21",
        max_temp: 24,
        min_temp: 21,
        rainfall: "rainfall ",
      },
    ];
    const startTimestamp = 1639958400000;

    const expectedResult = [
      "2021-12-20",
      {
        id: 2,
        description: "description",
        date: "2021-12-21",
        max_temp: 24,
        min_temp: 21,
        rainfall: "rainfall ",
      },
      "2021-12-22",
      "2021-12-23",
      "2021-12-24",
      "2021-12-25",
      "2021-12-26",
    ];

    const result = getWeatherEventsToRender(data, startTimestamp);

    expect(result).toEqual(expectedResult);
  });

  test("should filter weather events", () => {
    const data: Array<WeatherEventModel> = [
      {
        id: 1,
        description: "description",
        date: "2021-12-16",
        max_temp: 21,
        min_temp: 20,
        rainfall: "rainfall",
      },
      {
        id: 2,
        description: "description",
        date: "2021-12-21",
        max_temp: 24,
        min_temp: 21,
        rainfall: "rainfall ",
      },
    ];
    const startTimestamp = 1639958400000;
    const expectedResult = [
      {
        id: 2,
        description: "description",
        date: "2021-12-21",
        max_temp: 24,
        min_temp: 21,
        rainfall: "rainfall ",
      },
    ];
    const result = filterWeatherEvents(data, startTimestamp);
    expect(result).toEqual(expectedResult);
  });
});

export {};
