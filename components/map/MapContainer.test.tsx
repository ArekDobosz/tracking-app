import { MapContainer } from './MapContainer';
import { render, screen, fireEvent } from '@testing-library/react';
import { CarPosition } from 'types';
import * as usePositionsHook from 'hooks/usePositions';

jest.mock('../../environment.ts', () => ({
  environment: {
    googleMapsApiKey: 'secret-google-api-key',
  },
}));

const getMockedPositions = () => {
  const date = new Date();
  return [1, 2, 3, 4, 5].map((id) => ({
    id: id,
    regNumber: `GD 000${id}`,
    createdAt: date,
    updatedAt: date,
    position: [
      {
        id: id,
        carId: id,
        lat: Math.random(),
        lng: Math.random(),
        createdAt: date,
        updatedAt: date,
      },
    ],
  }));
};

describe('MapContainer', () => {
  const setup = (positions: CarPosition[] = [], called = false) => {
    const mockedGetPositions = jest.fn();
    const mockUpdateSearchingPhrase = jest.fn();
    jest.spyOn(usePositionsHook, 'usePositions').mockImplementation(() => ({
      positions,
      called,
      getPositions: mockedGetPositions,
      updateSearchingPhrase: mockUpdateSearchingPhrase,
    }));

    render(<MapContainer />);

    return { mockedGetPositions, mockUpdateSearchingPhrase };
  };

  it('should render loading spinner for map and for list', async () => {
    setup();
    const loadingSpinner = screen.getAllByRole('progressbar');
    expect(loadingSpinner.length).toEqual(2);
  });

  it('should render list of cars', () => {
    const mockedPositions = getMockedPositions();
    setup(mockedPositions, true);

    const cars = screen.getAllByText(/GD 000/);
    expect(cars.length).toEqual(mockedPositions.length);
  });

  it('seach phrase should be updated', async () => {
    const { mockUpdateSearchingPhrase } = setup([], true);

    const searchInput = screen.getByLabelText('Search by');
    await fireEvent.change(searchInput, { target: { value: 'GD 00' } });

    const searchButton = screen.getByText('Search');
    await fireEvent.click(searchButton);

    expect(mockUpdateSearchingPhrase).toHaveBeenCalledWith('GD 00');
  });
});
