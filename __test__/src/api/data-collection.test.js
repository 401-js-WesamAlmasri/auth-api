'use strict';

const DataCollection = require('../../../src/models/data-collection');

describe('Data Collection', () => {
  // mock the model
  function Model(record) {
    this.save = jest.fn(() => 'record result');
  }
  Model.findOne = jest.fn();
  Model.find = jest.fn();
  Model.findByIdAndUpdate = jest.fn();
  Model.findByIdAndDelete = jest.fn();

  it('should create a data collectiom instance', () => {
    // Arrange
    // Act
    let dataCollection = new DataCollection(Model);
    // Assert
    expect(dataCollection.model).toEqual(Model);
  });

  it('should use the get method without arguments successfully', () => {
    // Arrange
    let dataCollection = new DataCollection(Model);
    // Act
    dataCollection.get();
    // Assert
    expect(dataCollection.model.find).toHaveBeenCalledWith({});
  });

  it('should use the get method with id argument successfully', () => {
    // Arrange
    let dataCollection = new DataCollection(Model);
    // Act
    dataCollection.get('someid');
    // Assert
    expect(dataCollection.model.findOne).toHaveBeenCalledWith({
      _id: 'someid',
    });
  });

  it('should use the update method with id and record argument successfully', () => {
    // Arrange
    let dataCollection = new DataCollection(Model);
    // Act
    dataCollection.update('someid', 'record');
    // Assert
    expect(dataCollection.model.findByIdAndUpdate).toHaveBeenCalledWith(
      'someid',
      'record',
      { new: true }
    );
  });

  it('should use the delete method with id argument successfully', () => {
    // Arrange
    let dataCollection = new DataCollection(Model);
    // Act
    dataCollection.delete('someid');
    // Assert
    expect(dataCollection.model.findByIdAndDelete).toHaveBeenCalledWith(
      'someid'
    );
  });

  it('should use the create method with record as an argument successfully', () => {
    // Arrange
    let dataCollection = new DataCollection(Model);
    // Act
    let record = dataCollection.create('record');
    // Assert
    expect(record).toEqual('record result');
  });
});
